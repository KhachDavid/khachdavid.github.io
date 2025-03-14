# Controlling Unitree GO1 with AR Glasses


<iframe style="width: 100%; max-width: 600px; height: auto; min-height: 400px; 
            @media (min-width: 768px) { width: 80%; max-width: 800px; } 
            @media (min-width: 1200px) { width: 60%; max-width: 1000px; }" src="https://www.youtube.com/embed/fxmVGViPP74?si=WH9VBvqyr7Oq93H6" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</br>
</br>
</br>

Github Repository is [here](https://github.com/KhachDavid/gesture-control-go1)

## Project Overview
AR technology spent the last decade on standby to be the next big breakthrough field. This started in 2013 when Google released its consumer AR Glass, the Google Glass, which ended up in their graveyard in 2023. This is a drop in the bucket of failed AR technologies. It seems like AR will never receive mainstream adoption. The reason is their lack of developer support. Recently, Meta came out with new AR Glasses, claiming to have revolutionized the industry. However, they have the same problem. There is nothing you can develop for them. In my opinion what they call AR is just a glorified headset.

In the sea of closed-source AR devices, Brilliant Labs is a company that attempts to restore faith in AR technology. Their Frames are fully open-source and support Python, Flutter, and JavaScript SDKs, opening up many opportunities for applying AR technology in a meaningful way. Brilliant Frames support a fully programmable 640x400 color OLED display and a fully capable 720p low power color camera. It is not really high quality, however it is good enough for the purpose of computer vision and robotics applications. 

<img src="https://raw.githubusercontent.com/KhachDavid/static/refs/heads/main/animated_block_diagram.gif" style="width: 100%; max-width: 600px; height: auto; 
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

## Unitree GO1 Quadruped Robot

The GO1 robot is a quadruped robot developed by Unitree Robotics. It is controlled using a C++ API that communicates with the robot through a UDP connection. The API provides functions to control the robot's joints, read sensor data, and get the robot's camera feed. However, the camera feed is not used. Instead a ZED camera is mounted on top of the robot that is connected to a Jetson. The robot control pipeline is adapted from the repository [unitree_legged_sdk](https://github.com/katie-hughes/unitree_ros2). A new ROS2 node was created to control the robot using the API. The node has a variable that stores the current gesture, which is updated via a subscription to the "active_gesture" topic. The subscriber callback receives strings representing gestures and sets the current gesture accordingly. In the high-frequency control loop, the node evaluates the current gesture and formulates a corresponding command message. Depending on the gesture (such as "up," "down," "left," "right," "forward," "back," or "hand"), the node configures parameters like velocity, gait type, and motion mode, then publishes a message to the "high_cmd" topic.

## AR Glasses

I used the Brilliant Frames for this project. The Frames are a pair of AR glasses that have a fully programmable 640x400 color OLED display and a fully capable 720p low power color camera. The AR glasses are a central component for providing the operator with real-time visual feedback directly from the robot's onboard camera. The **Brilliant Frames** are entirely open-source. For the scope of this project, I developed the graphics for it, which was documented [here](https://docs.brilliant.xyz/frame/hardware/#display). Below are the key developments conducted:

Displaying Images on the Glass:

- A custom Python TxSprite class was written to convert images into a sprite format compatible with the glasses. Due to the availability of 4 bits per pixel, the images were quantized to 16 colors.

- Lua scripts were updated and flashed to ensure that bitmapped images (with necessary color quantization for a monochrome display) could be rendered. For the purpose of this project, the following file is flashed in `camera_feed.py`:

```python
await frame.upload_file("lua/compressed_prog_sprite_frame_app.lua", "frame_app.lua")
```

Image Feedback from the Robot:

- Early experiments streamed images using SCP for convenience. After rapid prototyping, the pipeline was changed to use HTTP transfer (yielding approximately 0.3-second latency) for improved reliability.

- Improvements included parallelization of the Mediapipe pipeline and the robot’s live stream using asyncio, leading to a more robust closed-loop control demonstration.

- Experimental modifications with LZ4 compression, enabled by firmware release v25.031.0924 (which added an API for decompression), further accelerated the display. This firmware was published by Brilliant Frames on GitHub and can be found [here](https://github.com/brilliantlabsAR/frame-codebase/releases/tag/v25.031.0924  
).

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

## Integration, Advanced Gestures, and Future Modes

![Advanced Gestures](
    readme_assets/side_mount.png
)

After the initial integration of gesture-based controls with visual feedback, the focus turned to advanced control modes and enhanced robotics behavior.

Advanced Gestures and Dog Movements:

- The Unitree GO1 successfully performed all required movements (left/right/up/down) and even executed a handshake routine in response to a “fist” gesture.

- A custom demonstration allowed the dog to perform a dance routine as a playful response when certain gestures were recognized.

IMU and Optical Flow for Alternative Control Modes:

- A proposed stretch goal is to implement two new control modes using the AR glasses:

- “Pointing” Mode: leveraging optical flow to move the dog towards a location indicated by the user’s gesture. This mode uses odometry to counteract challenges such as occlusion.

- “IMU” Mode: based on head movements detected by the glasses’ IMU. Despite challenges in filtering out sensor noise (including the need for debounce routines and potentially Kalman filters), early experiments with roll and pitch have already yielded promising results.

- Discussions with other developers (e.g., CitizenOneX on GitHub) have informed attempts to integrate more robust filtering methods for accurate heading/yaw from the magnetometer, though calibration remains nontrivial.

Hardware and Firmware Enhancements:

- A new Raspberry Pi Zero-based camera setup was tested and reconfigured to reduce latency between the dog’s camera capture and the AR glasses display.

- Firmware updates on the glasses and adjustments in the communication protocols (moving between HTTP and Bluetooth) have progressively optimized the closed-loop control interface.

## Project Timeline and Tasks Overview

A detailed list of milestones is maintained, with key completions and upcoming challenges, such as:

Setting Up the Glasses:

- Preliminary tests and fully functional demos for image feedback and gesture recognition were completed by mid-January.

- A custom Bluetooth package was created and integrated successfully.

Moving Unitree GO1:

- The integration of the ROS2 C++ SDK into the development environment was successfully handled, with the robot responding correctly to commands from the gesture recognition pipeline by late January.

- Advanced Gestures and Image Feedback via AR Glasses

- Progressive updates (from February through early March) included the integration of LZ4 image compression, improved closed-loop control demonstrations, and experimental modifications with the Raspberry Pi Zero trials, each documented by week.

Future Tasks and Improvements:

- Ongoing work involves finalizing the IMU control mode, particularly calibrating the magnetometer and filtering IMU noise.

- Investigations into simpler yet effective Optical Flow approaches will be pursued to further eliminate latency in the “pointing” control mode.

- There is an intention to extend the demonstration to generalize control modules for other robotics platforms (such as drones and robot arms) in the future.

## Conclusion

This project demonstrates the feasibility of closed-loop control of a quadruped robot using high-level hand gestures and AR-enabled visual feedback. Starting with basic movement commands and evolving into advanced control modes, the iterative development process has been guided by a detailed journal documenting week-by-week progress. The integration of ROS2-based control, Mediapipe hand tracking, and AR glasses for real-time imaging forms a robust proof-of-concept that not only achieves closed-loop control but also opens the door to future enhancements such as IMU-based head movement control and optical flow for spatial navigation.

<iframe style="width: 100%; max-width: 600px; height: auto; min-height: 400px; 
            @media (min-width: 768px) { width: 80%; max-width: 800px; } 
            @media (min-width: 1200px) { width: 60%; max-width: 1000px; }" src="https://www.youtube.com/embed/POHBXnE-2EU?si=vtejNMxPS6ItHHtg&amp;start=4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

By sharing these insights and the challenges encountered, from meeting hardware limitations to overcoming the biggest issue of latency, the intention is to contribute openly to the robotics and AR communities and lay the foundation for more immersive, intuitive human–robot interfaces.

## Sources and References

- [Brilliant Frames](https://brilliant.xyz/pages/developers)
- [MediaPipe](https://google.github.io/mediapipe/)
- [Unitree SDK](https://github.com/katie-hughes/unitree_ros2)
- [Unitree Documentation](https://unitree-docs.readthedocs.io/en/latest/get_started/Go1_Edu.html)
