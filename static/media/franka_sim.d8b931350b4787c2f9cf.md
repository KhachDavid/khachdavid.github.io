# Franka FCI Simulator in Drake

<style>
/* Scoped styles for this page only */
.franka-doc h2 {
  margin-top: 2.0rem;
  padding-bottom: 0.4rem;
  border-bottom: 2px solid #e5e7eb;
}
.franka-doc h3 {
  margin-top: 1.5rem;
  padding-left: 6px;
  border-left: 4px solid #e5e7eb;
}
.franka-doc .callout {
  background: #f8fafc;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 12px 14px;
}
.franka-doc .divider {
  height: 2px;
  background: linear-gradient(90deg, #e5e7eb, #cbd5e1, #e5e7eb);
  border: 0;
  margin: 24px 0;
}
.franka-doc .kicker {
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #64748b;
  font-weight: 600;
  font-size: 0.8rem;
}
</style>

<div class="franka-doc">

## Overview

The goal of this project is to let you run libfranka programs in simulation just as you would on a real Franka robot. Instead of connecting to the robot’s IP address, your program connects to a simulation server. Behind the scenes, the simulator runs on Drake, which provides accurate physics and dynamics. This means you can test and develop complex control algorithms in simulation with a level of fidelity that’s very close to the real robot, while still being aware of some limitations.

---

## Demo

<iframe style="width: 100%; max-width: 600px; height: auto; min-height: 400px; 
            @media (min-width: 768px) { width: 80%; max-width: 800px; } 
            @media (min-width: 1200px) { width: 60%; max-width: 1000px; }" src="https://www.youtube.com/embed/L1WH8uicBFM?si=wEdyTQbPsxEVHHZH" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

<p style="
    font-size: 0.8em;
    font-style: italic;
    color: #777;
">
<a href="https://github.com/KhachDavid/libfranka/blob/panda/examples/pick_and_place.cpp" target="_blank">Example of running the same pick and place libfranka program in the simulator and in the real robot.</a>
</p> 

---

<hr class="divider"/>

## Getting Started

### Source Code

The source code for the project is available on [GitHub](https://github.com/KhachDavid/franka_drake). It can be run using the Dockerfile or built from source. I would recommend using the Dockerfile to install drake. Instructions for building from source are available in the README.md file.

---

<hr class="divider"/>

## Technical Details

### System Architecture

<svg width="800" height="400" xmlns="http://www.w3.org/2000/svg">
  <!-- Background -->
  <rect width="800" height="400" fill="white" stroke="#ccc" stroke-width="1"/>
  
  <!-- Franka FCI Box -->
  <rect x="50" y="50" width="200" height="80" fill="#e3f2fd" stroke="#2196f3" stroke-width="2" rx="5"/>
  <text x="150" y="85" text-anchor="middle" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="#1976d2">Franka FCI</text>
  
  <!-- Drake FCI Box -->
  <rect x="550" y="50" width="200" height="80" fill="#e8f5e8" stroke="#4caf50" stroke-width="2" rx="5"/>
  <text x="650" y="85" text-anchor="middle" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="#388e3c">Drake FCI</text>
  <text x="650" y="105" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" fill="#388e3c">interface to drake physics</text>
  
  <!-- libfranka Box -->
  <rect x="300" y="200" width="200" height="80" fill="#fff3e0" stroke="#ff9800" stroke-width="2" rx="5"/>
  <text x="400" y="245" text-anchor="middle" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="#f57c00">libfranka</text>
  
  <!-- MoveIt Optional ROS2 Box -->
  <rect x="300" y="320" width="200" height="60" fill="#fce4ec" stroke="#e91e63" stroke-width="2" rx="5"/>
  <text x="400" y="350" text-anchor="middle" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#c2185b">MoveIt  ROS2 (optional)</text>
  
  <!-- Connection lines -->
  <path d="M 400 200 L 150 130" stroke="#666" stroke-width="2" fill="none" marker-end="url(#arrowhead)"/>
  <path d="M 400 200 L 650 130" stroke="#666" stroke-width="2" fill="none" marker-end="url(#arrowhead)"/>
  <path d="M 400 320 L 400 280" stroke="#666" stroke-width="2" fill="none" marker-end="url(#arrowhead)"/>
  
  <!-- Arrow marker definition -->
  <defs>
    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#666"/>
    </marker>
  </defs>
</svg>

<p style="
    font-size: 0.8em;
    font-style: italic;
    color: #777;
">
<span class="kicker">Block Diagram</span>: Simplified architecture showing Franka FCI and Drake FCI communication via TCP/UDP with libfranka interface and optional MoveIt/ROS2 integration.
</p>
</br>

The Franka DFCI Simulator has a client server architecture. The client - libfranka - talks to the DFCI thread over a TCP/UDP connection. The DFCI thread is responsible for accepting commands from the client and passing them to the Drake simulation engine. The Drake simulation engine is responsible for updating the state of the robot and passing it back to the client.

### Core Components

---

#### SharedRobotState (Thread-Safe, Mutex Protected)
This central component maintains the robot's current state and pending commands:
- Joint States: `q[7]`, `dq[7]`, `tau_J[7]` (position, velocity, torque for 7 joints)
- Commands: `q_cmd[7]`, `tau_cmd[7]` (desired joint position and torque)
- End-Effector Poses: `0_T_EE[16]`, `0_T_EE_cmd[16]` (current and commanded end-effector poses)
- Control Flags: `has_position_command`, `has_torque_command`, `current_controller_mode`

#### MultibodyPlant
- 7-DOF Franka Robot Model with accurate mass properties and joint limits
- Outputs robot state to the controller
- Receives total torques for state updates

#### FciPositionController
- PID Controller implementing the control law: τ = KP * (q_d - q) - Kd * dq
- Calculates control torques based on desired vs. current joint positions
- Provides smooth trajectory following with configurable gains

#### Gravity Compensation
- InverseDynamics System that computes gravity compensation torques
- Ensures the robot can maintain positions without drift
- Accounts for the full kinematic chain and mass distribution

#### Torque Adder
- Combines gravity compensation and control torques
- Provides the total torque input to the MultibodyPlant
- Enables both position and torque control modes

#### State Extraction & Feedback
The feedback loop processes simulation results:
- Extracts joint positions, velocities, and torques from Drake
- Calculates end-effector pose transformations
- Updates the shared robot state with current information
- Converts data to RobotState messages for client consumption

---

### Integration Capabilities

The simulator provides multiple integration options:

- Standalone Application: Can be built and run as a complete FCI simulator
- Library Integration: Can be included in existing Drake programs
- ROS2 Compatibility: Works with ROS2 and MoveIt-based control systems
- Visualization: Optional SceneGraph visualization accessible via localhost:7000

---

<hr class="divider"/>

## Current Status

### Limitations

- The simulator requires a real time kernel to run. A consistent 1 kHz update rate is required by libfranka.
- The simulator does not support the full range of features of the real FCI. See the dashboard for more details.
- The simulator does not support a specific way of adding a custom end effector.

### Real Time Factor (RTF) Tool

It is possible to monitor the RTF of the simulator. Below is an example of the RTF monitor for the simulator. Attached is a guide on how to set up the RTF monitor.

<div class="callout">
  <iframe
    src="/rtf-monitor.html"
    title="RTF Monitor"
    style="width: 100%; max-width: 760px; height: 220px; border: 0;"
  ></iframe>
  <p style="margin: 8px 0 0 0; font-size: 0.9rem; color: #64748b;">
    For setup, data format, and troubleshooting, please see the concise guide:
    <a href="https://github.com/KhachDavid/franka_drake/blob/main/docs/real_time_factor_monitoring.md" target="_blank">real_time_factor_monitoring.md</a>.
  </p>
</div>




<hr class="divider"/>

## Examples & Documentation

### Examples Dashboard

For comprehensive documentation on libfranka examples and their compatibility with the Franka Drake simulator, please refer to the official dashboard:

**[View the Complete Examples Dashboard](https://github.com/KhachDavid/franka_drake/blob/main/docs/libfranka_examples.md)**

The dashboard provides detailed information about:
- Example compatibility status
- Feature comparison between Real FCI and Drake FCI

This is the authoritative source for all libfranka examples and their integration with the Franka Drake simulator.

---

<hr class="divider"/>

## Future Work

This ability to conduct position control with such high accuracy opens the door to a lot of robot learning applications. A great next project would be to use the simulator to train a robot to perform a task.

---

<hr class="divider"/>

## Acknowledgments

<img src="https://raw.githubusercontent.com/KhachDavid/static/refs/heads/main/elwin-matt.jpg" style="width: 100%; max-width: 200px; height: auto; 
            @media (min-width: 768px) { width: 100%; max-width: 200px; } 
            @media (min-width: 1200px) { width: 100%; max-width: 200px; }" />

I would like to thank my advisor [Prof. Matt Elwin](https://robotics.northwestern.edu/people/profiles/faculty/elwin-matt.html) for his support and guidance.

</div>