# Hand Crank Generator

This project is inspired by [Tom Stanton's hand crank generator](https://youtu.be/tb3iN4m9Bik).

## Overview

The hand crank generator is a device that converts mechanical energy into electrical energy. The device consists of a rotor, stator, and a crank. The rotor is connected to the crank, and when the crank is turned, the rotor rotates. The rotor is made up of a series of magnets that rotate past a series of coils in the stator. The magnets induce a current in the coils, which is then rectified and stored in a capacitor. The stored energy can then be used to power small electronics.

## Assembly

<img src="https://raw.githubusercontent.com/KhachDavid/static/refs/heads/main/generator_setup.jpg"  style="width: 100%; max-width: 600px; height: auto; 
            @media (min-width: 768px) { width: 80%; max-width: 800px; } 
            @media (min-width: 1200px) { width: 60%; max-width: 1000px; }">
<p style="
    font-size: 0.8em;
    font-style: italic;
    color: #777;
">
Winding the coils was quite possibly the toughest part of this.
</p>
</br>



1. 3D Print the Parts. Instructions for 3D printing the parts can be found in the 3D Printed Parts section below.
2. Wind and Assemble the Coil Templates
    - Prepare the Coil Templates:
        - Take the 3D-printed coil templates and secure them in place for winding.
    - Wind the Coils:
        - Use enameled copper wire to wind the coils around the templates. Ensure consistent tension and neat winding.
        - Wind multiple coils, as specified, for 2 series and 4 parallel configurations.
    - Connect the Coils:
        - Solder the coils in a 2 series, 4 parallel arrangement.
        - Ensure connections are secure and insulation is intact to avoid short circuits.
3. Build the Full-Bridge Rectifier
    - Prepare Components:
        - Use four diodes (e.g., 1N4007 or similar) to create a full-bridge rectifier.
    - Assemble the Rectifier:
        - Connect the diodes to form the rectifier circuit. Ensure the orientation of the diodes is correct for AC-to-DC conversion.
    - Test the Circuit:
        - Verify the rectifier output using a multimeter to confirm it converts AC to DC.
4. Assemble the Rotor and Stator
    - Prepare the Rotor:
        - Attach the crank gear to the rotor using a shoulder bolt. Ensure it rotates smoothly.
    - Prepare the Stator:
        - Secure the coil stator and coil templates together to form the complete stator.
        - Integrate the soldered coil assembly into the stator setup.
5. Assemble the Generator Frame
    - Attach Frame Parts:
        - Connect the frame front and frame rear using the spacers. Ensure the assembly is rigid.
    - Install the Rotor:
        - Insert the rotor into the frame using a shaft. Verify that the rotor spins freely without obstruction.
    - Attach the Stator:
        - Secure the stator assembly to the frame. Ensure proper alignment between the rotor and stator for optimal magnetic coupling.
6. Connect the Electronics
    - Embed the Rectifier:
        - Secure the full-bridge rectifier to the frame near the stator.
        - Connect the coil leads to the input terminals of the rectifier.
    - Add Output Wires:
        - Solder output wires to the rectifier’s DC terminals. These wires will serve as the generator's power output.
        - For smoother DC output, connect a capacitor across the DC terminals of the rectifier.
7. Assemble the Crank Mechanism
    - Attach the Crank Gear:
        - Fix the crank gear to the rotor. Ensure it is tightly secured and rotates the rotor when turned.
    - Install the Crank Arm:
        - Attach the crank arm to the crank gear using a shoulder bolt.
    - Attach the Handle:
        - Secure the handle to the crank arm using another shoulder bolt.
8. Final Testing
    - Rotate the crank handle to spin the rotor and generate electricity.
    - Use a multimeter to measure the output voltage from the rectifier.
    - Verify that the generator produces a stable DC output.

The hand crank generator is now ready for use. Turn the crank handle to generate electricity and power small electronic devices.

The 4 serial and 2 parallel coil configuration was chosen to maximize the output voltage and current of the generator. This configuration allows for higher power output while maintaining a manageable coil size and complexity.

It ended up generating around 2.5 volts at 0.5 amps, which is enough to power small electronics like LEDs or charge a phone with a boost converter.

<img src="https://raw.githubusercontent.com/KhachDavid/static/refs/heads/main/IMG_9290.JPEG"  style="width: 100%; max-width: 600px; height: auto; 
            @media (min-width: 768px) { width: 80%; max-width: 800px; } 
            @media (min-width: 1200px) { width: 60%; max-width: 1000px; }">


## 3D Printed Parts

The 3D printed parts for the project can be found here: [Printables](https://www.printables.com/model/658157-hand-crank-generator/files)

Here are the number of parts required for the project:

| Part Name                   | Quantity |
| --------------------------- | -------- |
| 20x4mm Spacer.stl           | 1        |
| 20x2mm Spacer.stl           | 1        |
| 20x1mm Spacer.stl           | 1        |
| 10x2mm Spacer.stl           | 1        |
| Coil Template Stiffener.stl | 2        |
| Coil Template.stl           | 1        |
| Coil Stator.stl             | 1        |
| Handle.stl                  | 1        |
| Crank Gear.stl              | 1        |
| Rotor.stl                   | 2        |
| Frame Rear.stl              | 1        |
| Shaft.stl                   | 1        |
| Frame Front.stl             | 1        |
| Crank Arm.stl               | 1        |

## Items Purchased

Table of items purchased for the project.

| Item             | Vendor   | Link                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Quantity |
| ---------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| Bearings 32 20 7 | Mcmaster | [Link](https://www.mcmaster.com/5972K215/)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | 4        |
| Bearings 26 10 8 | Mcmaster | [Link](https://www.mcmaster.com/5972K94/)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | 3        |
| Magnets          | Amazon   | [Link](https://www.amazon.com/MAGXCENE-Rectangular-Industrial-Refrigerator-20x10x5mm/dp/B0BM64BPP2/ref=sr_1_1_sspa?crid=1SEF6VVGC67LT&dib=eyJ2IjoiMSJ9.rmpB05Lt5HMqTbiLU-mNqH8Oa66v1166wEDcLDokGPSQo5Vd1rRMQf2SoIYwiKTW6aVJIIPM9ETX6cstXk2pVsLdxfJBlcWh7tCdxzTF3uA-zybKaIgBucrYsmuft_Fa8mC4MqwEnbtRfOisW1hWtZaw7FvZA3QIT2jWKXuOqST8rdoAMjVh7GY6UwxbbGXkm5EIndR3JlVF3iS8eHa7n3zCCQ6qdkJzGzDhv09TgDM._9Kug0DxyqzoCR-pDYtuwoU6RdU5RNGsaZ0XV8mZH20&dib_tag=se&keywords=20x10x5%2Bmm%2Bmagnets&qid=1730835843&sprefix=20x10x5%2Bmm%2Bmagnet%2Caps%2C79&sr=8-1-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&th=1)                                    | 2        |
| Cooper Wire      | Mcmaster | [Link](https://www.mcmaster.com/7588K75/)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | 1        |
| Shoulder bolt    | Mcmaster | [Link](https://www.mcmaster.com/92981A308/)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | 2        |
| Diodes 60v 5a    | Amazon   | [Link](https://www.amazon.com/BOJACK-Schottky-Barrier-Rectifier-DO-201AD/dp/B07XDJGDQP/ref=sr_1_3?crid=3B5RX9WA3Q3EN&dib=eyJ2IjoiMSJ9.YVzBjAJaTmBgD4ZWqe2i24sDuGDgbp5LRFfw4bGeer6mG_XCbYAwVrAzpbnJknTYvtci8Y1F43nwjrKhFL0RuMe56oqj3l3-3-zBl6JXO1s-e2REgJ2GMiKs9bsVkbSoacslY6MylySgjb2GmyGmzjksAvIbHJoB-ym3coA4jBAl8DOsSP9E6ODUkb164duAJiCNGUhRVvoIJivLIe7ayogTAfqg0p2gt4fGbn-3L-E.DSN29xJX7FsAi0YZjmLkkGob6LJ-DeTssgyw70-dhnA&dib_tag=se&keywords=5amp+diode+30v&qid=1730836452&sprefix=5amp+diode+30%2Caps%2C80&sr=8-3)                                                                                                               | 1        |
| Capacitors       | Amazon   | [Link](https://www.amazon.com/Capacitor-Electrolytic-Capacitors-Electronic-Compatible/dp/B09TQTP56Y/ref=sr_1_2_sspa?crid=176S1RVM4UQ2X&dib=eyJ2IjoiMSJ9.SZ_NSy5o8N9108Nt4xMo6PFTw1viS8GjskyIL3VWBI7teGER1ViTUKvAymtfFPAKV__pEZZuZnjoXxb9rKLX_7kmZaH2LfZfYAlPY9swZbF5na2H4-laSpCUQhnYkVDWw0OTQEldY_TVNq776pfnipfuSCkkcU-_oDsHrpxr3bzG5FpOJweM2_bokwTdN542ubL4dpPkwgwrtQJ2eMQ6zEyOs0NyzEV1CGKA9aNJcHE.IPVndG8MtcodONFcCbxAXYgavzbFkwLjgKvTZZJ49OU&dib_tag=se&keywords=1000+uf+capacitor&qid=1730836546&sprefix=1000+uf+capacitor%2Caps%2C86&sr=8-2-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&psc=1)                                           | 1        |
| Connectors       | Amazon   | [Link](https://www.amazon.com/Pairs-Connector-Female-Silicon-Battery/dp/B085HF31K7/ref=sr_1_2_sspa?crid=2U9YF2U9VXOMY&dib=eyJ2IjoiMSJ9.nngpRUVRf-DUgyRDqeJY9vdU0cMqA_02N_U8sDkrIEB4Qt97ZZmwWpBXHCuth8sltTLjk-0SRDMCJHAfrN9X1y7yDT8Pn2KTr1T11Kc_Qh4vbiFOP-tHpmC3SnSWL8I6R5vkgoVnNjwRjtLo89VbS6v4H-r_qIxZwa_C3ofu6gF-n49VXLIzkT5iRkrDYAS9YplUDfJGi7OxyKw7wIdsWU-JsVVB1Kh3rV9Vgj8m1phx-TJmOKspr7sOPgvUL-pgzLFqqhjvR5t4CJfjyjjHVy3XZRIvdmMCTcocEk1ptho.8OXxHEbws4yfE6fSp2aOcwUTDMTiTyslAFXW8w4biQs&dib_tag=se&keywords=XT60+Connector&qid=1730836603&sprefix=xt60+connector%2Caps%2C103&sr=8-2-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&psc=1) | 1        |
| Bolts            | Mcmaster | [Link](https://www.mcmaster.com/91290A120/)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | 1        |
