# Controlling Unitree GO1 with AR Glasses


<iframe style="width: 100%; max-width: 600px; height: auto; min-height: 400px; 
            @media (min-width: 768px) { width: 80%; max-width: 800px; } 
            @media (min-width: 1200px) { width: 60%; max-width: 1000px; }" src="https://www.youtube.com/embed/kNUyV0vWa54?si=ziklwPIujL1BAju9" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</br>
</br>
</br>

## Project Overview
AR technology spent the last decade on standby to be the next big breakthrough field. This started in 2013 when Google released its consumer AR Glass, the Google Glass, which ended up in their graveyard in 2023. This is a drop in the bucket of failed AR technologies. It seems like AR will never receive mainstream adoption. The reason is their lack of developer support. Recently, Meta came out with new AR Glasses, claiming to have revolutionized the industry. However, they have the same problem. There is nothing you can develop for them. In my opinion what they call AR is just a glorified headset.

In the sea of closed-source AR devices, Brilliant Labs is a company that attempts to restore faith in AR technology. Their Frames are fully open-source and support Python, Flutter, and JavaScript SDKs, opening up many opportunities for applying AR technology in a meaningful way. Brilliant Frames support a fully programmable 640x400 color OLED display and a fully capable 720p low power color camera. It is not really high quality, however it is good enough for the purpose of computer vision and robotics applications. 

<img src="https://raw.githubusercontent.com/KhachDavid/static/refs/heads/main/Screenshot%20from%202025-01-27%2018-05-20.png" style="width: 100%; max-width: 600px; height: auto; 
            @media (min-width: 768px) { width: 80%; max-width: 800px; } 
            @media (min-width: 1200px) { width: 60%; max-width: 1000px; }" />
<p style="
    font-size: 0.8em;
    font-style: italic;
    color: #777;
">
Block Diagram: Input from the camera and output on the display
</p>
</br>

## AR Glasses

I used the Brilliant Frames for this project. The Frames are a pair of AR glasses that have a fully programmable display and camera. The Frames are open-source and support Python, Flutter, and JavaScript SDKs. The Frames have a fully programmable 640x400 color OLED display and a fully capable 720p low power color camera. The Frames are not really high quality, however they are good enough for the purpose of computer vision and robotics applications.

## Gesture Recognition

Gesture recognition was done using the MediaPipe library. MediaPipe is a cross-platform framework for building multimodal applied machine learning pipelines. It is developed by Google and is used in many applications, including gesture recognition. MediaPipe has a pre-trained model for hand gesture recognition that can recognize 21 different gestures. The model is based on a convolutional neural network (CNN) and is trained on a large dataset of hand gestures. For the first iteration of the project, I used the following gestures:

<img src="https://raw.githubusercontent.com/KhachDavid/static/refs/heads/main/final_gesture_mapping.png" style="width: 100%; max-width: 600px; height: auto; 
            @media (min-width: 768px) { width: 80%; max-width: 800px; } 
            @media (min-width: 1200px) { width: 60%; max-width: 1000px; }" />
<p style="
    font-size: 0.8em;
    font-style: italic;
    color: #777;
">
Initial gesture_recognizer.task model gestures
</p>
</br>


<img src="https://raw.githubusercontent.com/KhachDavid/static/refs/heads/main/lots_of_gestures.png" style="width: 100%; max-width: 600px; height: auto; 
            @media (min-width: 768px) { width: 80%; max-width: 800px; } 
            @media (min-width: 1200px) { width: 60%; max-width: 1000px; }" />
<p style="
    font-size: 0.8em;
    font-style: italic;
    color: #777;
">
Gesture detection from the camera perspective during runtime
</p>
</br>


## ROS2 Node

When the Frames detect a gesture, they send a message to a ROS2 node running on the computer. The ROS2 node receives the message and sends a command to the robot to perform the corresponding action. The ROS2 node is written in C++ to interface with the Unitree SDK.

```python
if (top_gesture.category_name.lower() == "thumb_up"):
    # invoke the robot to move up with ros2 run unitree_legged_real frames_open_palm
    print("Thumbs up detected!")
    await f.display.show_text("Thumbs up detected!")
    ros_controller.publish_to_topic("/active_gesture", "std_msgs/msg/String", '{data: "thumb_up"}')

elif (top_gesture.category_name.lower() == "open_palm"):
    print("Open palm detected!")
    await f.display.show_text("Open palm detected!")
    ros_controller.publish_to_topic("/active_gesture", "std_msgs/msg/String", '{data: "open_palm"}')

```

In the code above, the python program publishes a message to the `/active_gesture` topic when a gesture is detected. The ROS2 node subscribes to this topic and sends a command to the robot to perform the corresponding action.

## Sources and References

- [Brilliant Frames](https://brilliant.xyz/pages/developers)
- [MediaPipe](https://google.github.io/mediapipe/)
- [Unitree SDK](https://github.com/KhachDavid/unitree_ros2_for_frames)
- [Unitree Documentation](https://unitree-docs.readthedocs.io/en/latest/get_started/Go1_Edu.html)
