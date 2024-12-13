# 2D Dice in a box simulation
---
</br>
<img src="https://raw.githubusercontent.com/KhachDavid/static/refs/heads/main/dice_animation.gif">
</img>
<p style="
    font-size: 0.8em;
    font-style: italic;
    color: #777;
">

Explore this project on [GitHub](https://github.com/KhachDavid/die-2d-simulation)
</p>
</br>


Euler-Lagrange equations are used to simulate the motion of a dice in a box. The dice is placed in a box, and the box is rotated. The dice moves inside the box due to the rotation of the box. The equations of motion are derived using the Euler-Lagrange equations. The simulation is done using SymPy and Matplotlib.

</br>

## Euler-Lagrange Equations

---

The equations of Euler-Lagrange are given by:

$\frac{d}{dt}(\frac{\partial L}{\partial \dot{q_{i}}}) - \frac{\partial L}{\partial q_{i}} = 0$

where:
- $L$ is the Lagrangian
- $q_{i}$ is the configuration variable
- $\dot{q_{i}}$ are the generalized velocities of the configuration variables

For this simulation, the configuration variables are the angles, $x$, and $y$ coordinates of the box and the dice.

$q = [x_{box}, y_{box}, \theta_{box}, x_{dice}, y_{dice}, \theta_{dice}]$

</br>
</br>

## Forces in this system
---

The forces acting on the system are defined as follows:
</br>
</br>
**Restoring Force**: A restoring force, $( F_{\theta_b} )$, arises due to the motion of the box, expressed as:

$F_{\theta_b} = k \cdot \sin\left(\frac{\pi t}{2.5}\right)$

where:

$k$ is the stiffness constant valued at 10000 in this simulation
</br>
</br>

**Gravitational Force**: The downward force, $F_{y_b}$, acting on the box:

$F_{y_b} = 4 \cdot m_{box} \cdot g$

</br>

**External Forces**: Together, these forces are combined into a generalized force vector:

$
F_{\text{ext}} = \begin{bmatrix}
0 \
F_{y_b} \
F_{\theta_b} \
0 \
0 \
0
\end{bmatrix}
$

</br>
</br>

## Simulation
---

The simulation of the equations of motion gives the following configurations of the dice and the box:

<img src="https://raw.githubusercontent.com/KhachDavid/static/refs/heads/main/box_position.png">
</img>


<img src="https://raw.githubusercontent.com/KhachDavid/static/refs/heads/main/box_velocity.png">
</img>


<img src="https://raw.githubusercontent.com/KhachDavid/static/refs/heads/main/jack_position.png">
</img>


<img src="https://raw.githubusercontent.com/KhachDavid/static/refs/heads/main/jack_velocity.png">
</img>
