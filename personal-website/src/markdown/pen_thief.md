# 'Pen Thief' Robot

A robotic arm project using computer vision to track and retrieve a pen from its location.

<img src="https://raw.githubusercontent.com/KhachDavid/static/refs/heads/main/pen_demo.gif" style="width: 100%; max-width: 600px; height: auto; 
            @media (min-width: 768px) { width: 80%; max-width: 800px; } 
            @media (min-width: 1200px) { width: 60%; max-width: 1000px; }" />
</img>

Explore the project on [GitHub](https://github.com/KhachDavid/pen-challenge/tree/main).

## Description
The aim of this project is to enable the PincherX 100 robot arm to successfully grasp a pen placed in front of it. I used **OpenCV** for image processing and pen tracking. An **Intel RealSense D435i** camera was used to capture depth and color data to locate a purple pen. The **PincherX 100 Robot Arm** was used to execute the movements required to grab the pen.

## Implementation

In my implementation, the core idea revolves around transforming camera coordinates into the robot's coordinate system using a rigid body transformation. The process involves two main steps: rotation and translation. The rotation is determined by aligning two sets of points (robot and camera) using the least-squares solution for rotation, computed by the `scipy.spatial.transform.Rotation.align_vectors` function. The translation vector $t$ is then calculated as the difference between the centroids of the robot and camera point sets, after applying the rotation.
</br>
</br>

Mathematically, the transformation is expressed as:

$P_{robot} = R \cdot P_{camera} + t$

Where:

- $P_{robot}$ represents the coordinates in the robot's frame.
- $P_{camera}$ is the point in the camera's frame.
- $R$ is the rotation matrix.
- $t$ is the translation vector.

The `rotate_vectors` method computes the rotation matrix $R$, and the translation vector $t$ aligns the camera coordinates with the robot's frame. This approach enables the robot to accurately move towards the pen by converting the 3D camera data to the robot's coordinate system, allowing precise robotic movement control.

## How to run

- Place the Realsense and the PincherX at 120 degrees. (To avoid running calibration)
- `ros2 launch interbotix_xsarm_control xsarm_control.launch.py robot_model:=px100`
- Optional, if calibrated: `python3 main.py -c`
- `source ws/interbotix/install/setup.bash`
- `python3 main.py`
- Place the pen in front of the robot. It should start grabbing the pen.