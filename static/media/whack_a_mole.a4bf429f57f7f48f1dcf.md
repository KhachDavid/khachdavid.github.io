# Franka Panda Whack-a-Mole

<iframe style="width: 100%; max-width: 600px; height: auto; min-height: 400px; 
            @media (min-width: 768px) { width: 80%; max-width: 800px; } 
            @media (min-width: 1200px) { width: 60%; max-width: 1000px; }" src="https://www.youtube.com/embed/GG81r0z8W5s?si=DBgZmnv9W0fnefaN" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## Description
This package enables the Franka Panda robot play whack-a-mole on a custom whack-a-mole game. The 
physical setup requires **Intel RealSense D435i** camera, a singular [**April tag**](https://raw.githubusercontent.com/KhachDavid/static/8877aa3db0c816fd949b4de143bc3d5e9dfb3708/tag36h11-0%20(1).svg) attached to the base of the 
robot, a servo/hammer end-effector attachment connected to an Arduino microcontroller, and 
optionally a DIY whack-a-mole set attached to its own Arduino microcontroller. The game is played
using color and illumination detection and the "moles" are hit using a servo-hammer end-effector
attachment, the IDE code for which is also provided within this repository. The franka robot is
operated using MoveIt wrapper API created by me and fellow group members and can be found [here](https://github.com/ME495-EmbeddedSystems/homework-3-group-4).

</br>

## RViz Demonstration
<iframe style="width: 100%; max-width: 600px; height: auto; min-height: 400px; 
            @media (min-width: 768px) { width: 80%; max-width: 800px; } 
            @media (min-width: 1200px) { width: 60%; max-width: 1000px; }" src="https://www.youtube.com/embed/fRU9_S9x6lQ?si=5OoGoDXK0FmZW7ZB" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

</br>

## System Architecture 

<img src="https://raw.githubusercontent.com/KhachDavid/static/refs/heads/main/whack_a_mole_block_diagram.png" style="width: 100%; max-width: 600px; height: auto; 
            @media (min-width: 768px) { width: 80%; max-width: 800px; } 
            @media (min-width: 1200px) { width: 60%; max-width: 1000px; }" />
<p style="
    font-size: 0.8em;
    font-style: italic;
    color: #777;
">
Block Diagram of this System
</p>
</br>

The `camera_node` subcsribes to topics published by the realsense camera and detects colors and broadcasting the frames of the colors to the TF tree, thus making the camera and color frames visible on Rviz. To bring in the robot, the MoveIt API is launched along with the `apriltag_node` and `game`. The `apriltag_node` detects the april tag attached to the base of the robot. In the `game` node, a static transform between the base of the robot and the base april tag and the transform is computed using real world values once the april tag is attached to the base of the robot. Now the tf tree has all the info it needs for rviz to map the entire physical setup. Once the `/call_play` service is called, it causes a loop of `/play` service calls within the `hint` node. This `hint` node also receives a stream of data from the arduino on which button is lit up. Within the `/play` service callback in the `game` node, the transforms for the illuminated color is looked up from the tf tree and the `/pick_pose` custom service type is called, for which the service is located within the `comm_node`. Within the `pick_pose` callback, it interacts with MoveIt API to plan a path to the request goal pose and completes the action of swinging the hammer by calling custom action type called `swing_hammer`. The `swing_hammer` action sends a request to the servo controlled by an Arduino microcontroller to actuate the servo and swing the hammer, thus completing the hit action. This process is looped in `hint` node until the user kills the node on the terminal. The associated RQT graph and TF tree are shown below.

### RQT Graph:

<img src="https://raw.githubusercontent.com/KhachDavid/static/refs/heads/main/tf_svg.png" style="width: 100%; max-width: 1000px; height: auto; 
            @media (min-width: 768px) { width: 80%; max-width: 800px; } 
            @media (min-width: 1200px) { width: 60%; max-width: 1000px; }" />
<p style="
    font-size: 0.8em;
    font-style: italic;
    color: #777;
">
RQT Graph of whack_a_mole package
</p>
</br>


### TF Tree:

<img src="https://raw.githubusercontent.com/KhachDavid/static/refs/heads/main/tf_tree.png" style="width: 100%; max-width: 1000px; height: auto; 
            @media (min-width: 768px) { width: 80%; max-width: 800px; } 
            @media (min-width: 1200px) { width: 60%; max-width: 1000px; }" />
<p style="
    font-size: 0.8em;
    font-style: italic;
    color: #777;
">
TF (Transformation) tree of whack_a_mole package
</p>
</br>

## QuickStart
1. Install dependencies: `rosdep install --from-paths src --ignore-src -r -y`
1. Set up a `workspace` on your computer with the `src` directory.
2. Go to your `workspace/src` and clone this repository.
3. In the same `workspace/src`, clone our MoveItAPI (https://github.com/ME495-EmbeddedSystems/homework-3-group-4) and `colcon build` all repositories
4. [OPTIONAL] Create servo/hammer end-effector attachment and upload `servo_serial_communication.ino` to it via an Arduino microcontroller
5. [OPTIONAL] Create DIY whack-a-mole set and `build_moles.ino`to it via an Arduino microcontroller 
6. Set up April Tag 36h11:0 with base attachment found here (https://github.com/wengmister/Apex-Putter/issues/2)
7. Mount Realsense 2 camera in a location that is never impeded by the arm and `sudo install` requied `realsense2` and `apriltag_ros` packages
8. Connect to Franka Emika Panda Robot
9. Run  `ros2 launch whack_a_mole planner_swing.launch.xml` in terminal to load Rviz configuration of physical set-up
10. [OPTIONAL] Use `ros2 service call /go_home std_srvs/srv/Empty` to send robot to home configuration
11. Run `ros2 service call /call_play std_srvs/srv/Empty` to make the robot play the game and enjoy!

</br>


## Group

This project was developed as a group for the final project of ME 495: Embedded Systems in Robotics class.

Group Members: Ben Benyamin, David Khachatryan, Haodong Wang, Pushkar Dave, Sairam Umakanth

<img src="https://raw.githubusercontent.com/KhachDavid/static/refs/heads/main/whack_a_mole_group.jpeg" style="width: 100%; max-width: 1000px; height: auto; 
            @media (min-width: 768px) { width: 80%; max-width: 800px; } 
            @media (min-width: 1200px) { width: 60%; max-width: 1000px; }" />
