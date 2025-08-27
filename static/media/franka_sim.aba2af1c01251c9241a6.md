# Franka FCI Simulator in Drake

<iframe style="width: 100%; max-width: 600px; height: auto; min-height: 400px; 
            @media (min-width: 768px) { width: 80%; max-width: 800px; } 
            @media (min-width: 1200px) { width: 60%; max-width: 1000px; }"  src="https://www.youtube.com/embed/Ns_1qdhpPSM?si=TI7-oK1qRRnJAHyb" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

<p style="
    font-size: 0.8em;
    font-style: italic;
    color: #777;
">
<a href="https://github.com/KhachDavid/libfranka/blob/panda/examples/pick_and_place.cpp" target="_blank">Example of running the same pick and place libfranka program in the simulator and in the real robot.</a>
</p>
</br>

## Project Overview

The goal of this project is to create a high fidelity dynamics simulation of the Franka robot that is compatible with existing libfranka programs. Drake was chosen as the simulation backend due to its ability to support complex dynamics with a high degree of fidelity. The vision behind the project is to be able to run libfranka programs by passing `127.0.0.1` and watching the robot move in a simulated environment. This would allow for more efficient development and testing of libfranka programs.

## Result

The output of the drake-based franka simulator is a C++ libfrary that can be included in existing drake programs or simply run as an FCI simulator - from here referenced as Drake FCI or DFCI. You are able to build the simulator as a standalone application and run it on your machine. It is also possible to use the simulator as a library in your own programs. The simulator is compatible with ROS2 and MoveIt-based programs that control franka robots.

## Source Code

The source code for the project is available on [GitHub](https://github.com/KhachDavid/franka_drake).

## Software Stack

<img src="https://raw.githubusercontent.com/KhachDavid/static/refs/heads/main/block_diagram_drake.png" style="width: 100%; max-width: 800px; height: auto; 
            @media (min-width: 768px) { width: 100%; max-width: 800px; } 
            @media (min-width: 1200px) { width: 100%; max-width: 1000px; }" />
<p style="
    font-size: 0.8em;
    font-style: italic;
    color: #777;
">
Block Diagram: Drake based simulation of the Franka robot.
</p>
</br>

### System Architecture

The architecture of the Franka DFCI Simulator follows a client-server model with a shared state mechanism and a high-fidelity Drake simulation loop. The system is designed to provide seamless compatibility with existing libfranka programs while maintaining real-time performance and accurate dynamics simulation.

The Franka DFCI Simulator has a client server architecture. The client - libfranka - talks to the DFCI thread over a TCP/UDP connection. The DFCI thread is responsible for accepting commands from the client and passing them to the Drake simulation engine. The Drake simulation engine is responsible for updating the state of the robot and passing it back to the client.

### Core Components

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

### Integration Capabilities

The simulator provides multiple integration options:

- Standalone Application: Can be built and run as a complete FCI simulator
- Library Integration: Can be included in existing Drake programs
- ROS2 Compatibility: Works with ROS2 and MoveIt-based control systems
- Visualization: Optional SceneGraph visualization accessible via localhost:7000




<iframe style="width: 100%; max-width: 600px; height: auto; min-height: 400px; 
            @media (min-width: 768px) { width: 80%; max-width: 800px; } 
            @media (min-width: 1200px) { width: 60%; max-width: 1000px; }" src="https://www.youtube.com/embed/J8PVPIdU-eU?si=JeJ5WpF4dYczkrbM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

<p style="
    font-size: 0.8em;
    font-style: italic;
    color: #777;
">
Example of running an existing moveit program in the simulator.
</p>
</br>
