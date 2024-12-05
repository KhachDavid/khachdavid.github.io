import React from "react";
import "./About.css";
import headshot from "./headshot.png";

function About() {
  return (
    <div className="about-page">
      <h1>About Me</h1>
      <div className="about-content">
        <img src={headshot} alt="David Khachatryan" className="headshot" />
        <div className="about-text">
          <p>
            I graduated from the University of Wisconsin-Madison with a B.A. in
            Computer Science. During my time at UW, I worked in the MadAbility
            Lab using human-computer interaction techniques to build software
            for people with low vision. This accessibility research led me to
            Northwestern's MSR program, where I hope to use robotic assistive
            technology to help people with disabilities, specifically those who
            have lost their vision, lead easier lives.
          </p>
          <br/>
          <p>
            Outside of the academic world, I am a competitive chess player, and
            won the U2000 at the World Open 2022. Professionally, I worked as a
            software engineer as well as a senior DevOps engineer. I am also the
            creator of the app EL Tracker, which is used by thousands of
            Chicagoans every day to make riding Chicago Transit Authority trains
            easier and more accessible.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
