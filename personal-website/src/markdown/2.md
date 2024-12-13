# KUKA Robot Simulation

<img src="https://github.com/KhachDavid/khachdavid.github.io/blob/main/personal-website/src/kuka.gif?raw=true" height="200" width="300">
</img>

## Description

This project involves implementing a mobile manipulation system for a robot, focusing on trajectory generation, odometry, and feedback control. The simulation is done on CoppeliaSim. The goal is to control the robot's movement to manipulate an object, like a cube, using a combination of feedforward and feedback control. 

It takes an input:

- The initial place of the cube that must be picked up by the robot
- The final place of the cube that must be placed by the robot
- The initial place of the robot
- The initial place of the robot's end effector

Outputs:

- The path that the robot must follow to pick up the cube and place it in the final place as a csv file
- The error of the path as a csv file

Below is a brief description of the three main parts of the project:

## 1. Trajectory Generation

In this step, I generated the desired reference trajectory for the robot’s end-effector. This included defining the initial and final positions and orientations of the object (e.g., a cube) that the robot needs to pick up and place. The trajectory ensured that the robot’s movements were smooth and reached the goal without significant errors. I started with simple feedforward control to move the robot along this path.

## 2. Odometry

Odometry involves the process of estimating the robot’s position and orientation based on its movements. In this part, I implemented the kinematic model of the robot, which helps calculate the change in position as the robot moves along its trajectory. This step is intended for providing accurate state information to the controller, allowing it to correct any deviations from the desired path.

## 3. Feedback Control

The feedback control formula that I used is given by:

$\nu(t) = [Ad_{X^{-1}X_d}]\nu_{d}(t) + K_{p}X_{err}(t) + K_{i} \int_{0}^{t}X_{err}(t)dt$

where:
- $\nu(t)$ is the twist of the robot
- $Ad_{X^{-1}X_d}$ is the adjoint of the inverse of the desired twist
- $\nu_{d}(t)$ is the desired twist
- $K_{p}$ and $K_{i}$ are the proportional and integral gains
- $X_{err}(t)$ is the error in the twist
</br>
</br>

### Explanation

This formula combines three terms to compute the twist $\nu(t)$ that the robot should follow:

1. **Feedforward Term:**
   $[Ad_{X^{-1}X_d}]\nu_{d}(t)$ adjusts the desired twist $\nu_d$ into the robot's current reference frame. This term ensures that the robot follows the planned trajectory as closely as possible.

2. **Proportional Term:**
   $K_p X_{err}(t)$ applies a correction proportional to the error. If the error is large, this term increases the corrective twist, helping the robot quickly reduce discrepancies between its current and desired configurations.

3. **Integral Term:**
   $K_i \int_{0}^{t} X_{err}(t) dt$ addresses persistent errors over time (e.g., caused by drift or model inaccuracies). By summing up the error over time, this term helps to eliminate steady-state errors, improving long-term accuracy.

### Role in Feedback Control

Feedback control uses this formula to continuously compute adjustments in real time. The robot's current state is compared to the desired state, and any error is corrected through proportional and integral gains. This ensures that the robot converges to the desired configuration without excessive oscillations or overshooting.

The formula is implemented in the `FeedbackControl` function, where the components are calculated step by step:

- **Adjoint Transformation:** Converts the desired twist into the current frame using `mr.Adjoint`.
- **Desired Twist:** Derived from the change between the current desired configuration `Xd` and the next configuration `Xd_next` using `mr.se3ToVec`.
- **Error Twist:** Computed as the logarithm of the transformation between `X` (current configuration) and `Xd` (desired configuration).

The computed twist $\nu(t)$ is then converted into joint velocities and base twists using the robot's Jacobian matrix.

By combining feedforward, proportional, and integral components, the feedback control system achieves smooth, accurate, and robust motion control for the robot.

Feedback control is used to improve the accuracy of the robot’s movement by correcting errors in real time. The feedback control system typically uses proportional and integral gains (P and PI control) to minimize errors in position and orientation. The robot’s current state is compared with the reference trajectory, and adjustments are made to reduce any discrepancy. This phase ensures that the robot converges to the goal position and orientation without overshoot or oscillation.

The integration of these three parts—trajectory generation, odometry, and feedback control—enables the robot to successfully execute pick-and-place tasks, moving an object from its initial position to a goal configuration with minimal error.
