// ! React
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

// ! Gsap
import gsap from "gsap";
import { SplitText } from "gsap/all";

// ! Internal Imports
import circleCursor from "../utils/circleCursor";
import scaleCursor from "../utils/scaleCursor";

// ! Media
import water from "../assets/media/images/water.jpg";
import fire from "../assets/media/images/fire.jpg";
import signal from "../assets/media/images/signal.jpg";
import shelter from "../assets/media/images/shelter.jpg";
import food from "../assets/media/images/food.jpg";
import woods from "../assets/media/images/woods.jpg";
import way from "../assets/media/images/way.jpg";
import trip from "../assets/media/images/trip.jpg";
import hiking from "../assets/media/images/hiking.jpg";
import ready from "../assets/media/images/ready.jpg";

gsap.registerPlugin(SplitText);

export default function About() {
  useEffect(() => {
    // ? Circle Cursor
    circleCursor();

    // ? Scale Cursor on Hover
    gsap.utils.toArray(".links a").forEach((link) => scaleCursor(link));

    // ? Split the Text to Chars
    let splitted = new SplitText(".text", { type: "chars" });
    gsap.from(splitted.chars, {
      duration: 1,
      filter: "blur(10px)",
      scale: 3,
      opacity: 0,
      stagger: {
        amount: 0.5,
        from: "random",
      },
    });

    // ? Images Trailing
    const images = document.querySelectorAll(".image");

    let globalIndex = 0,
      last = { x: 0, y: 0 };

    // ? Showing the Image => "inactive" to "active" and Centering it
    const activate = (image, x, y) => {
      image.style.left = `${x}px`;
      image.style.top = `${y}px`;

      image.dataset.status = "active";

      last = { x, y };
    };

    // ? Distance Between 2 Points => x, y
    const distanceFromLast = (x, y) => {
      return Math.hypot(x - last.x, y - last.y);
    };

    window.addEventListener("mousemove", (e) => {
      if (distanceFromLast(e.clientX, e.clientY) > 100) {
        const lead = images[globalIndex % images.length],
          tail = images[(globalIndex - 5) % images.length];

        activate(lead, e.clientX, e.clientY);

        if (tail) tail.dataset.status = "inactive";

        globalIndex++;
      }
    });
  }, []);

  return (
    <div className="About">
      <span className="cursor"></span>
      <div className="links">
        <Link to="/">home</Link>
        <Link to="/rules">rules</Link>
      </div>
      <div className="text">
        <p>hey,</p>
        <p>i'm joe.. a guy who built this website for practicing.</p>
        <br />
        <p>but why survive?</p>
        <p>
          because surviving has been taking away my mind and my interests
          lately.
        </p>
        <br />
        <p>
          so what will you do if you find yourself in desert, forest or even
          snow?
        </p>
        <p>no home, no people, all you have your surviving skills</p>
        <br />
        <br />
        <p>it's you and life!</p>
      </div>
      <img className="image" src={way} data-index="0" data-status="inactive" />
      <img
        className="image"
        src={woods}
        data-index="1"
        data-status="inactive"
      />
      <img
        className="image"
        src={water}
        data-index="2"
        data-status="inactive"
      />
      <img
        className="image"
        src={hiking}
        data-index="3"
        data-status="inactive"
      />
      <img className="image" src={food} data-index="4" data-status="inactive" />
      <img
        className="image"
        src={ready}
        data-index="5"
        data-status="inactive"
      />
      <img
        className="image"
        src={signal}
        data-index="6"
        data-status="inactive"
      />
      <img className="image" src={trip} data-index="7" data-status="inactive" />
      <img className="image" src={fire} data-index="8" data-status="inactive" />
      <img
        className="image"
        src={shelter}
        data-index="9"
        data-status="inactive"
      />
    </div>
  );
}
