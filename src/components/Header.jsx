// ! React
import React, { useEffect, useRef } from "react";

// ! Gsap
import gsap from "gsap";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";

// ! Internal Imports
import scaleCursor from "../utils/scaleCursor";

// ! Media
import S from "/public/S";

gsap.registerPlugin(MorphSVGPlugin);

export default function Header({ navOpened }) {
  // ! Refs
  const burgerRef = useRef(null);
  const burgerIconRef = useRef(null);
  const afterBurgerRef = useRef(null);
  const closeNavRef = useRef(null);
  const logoRef = useRef(null);
  const logoTextRef = useRef(null);

  // ? Burger Hovering
  useEffect(() => {
    burgerRef.current.addEventListener("mouseenter", () => {
      if (navOpened) {
        gsap.to(burgerIconRef.current, {
          morphSVG: closeNavRef.current,
          duration: 0.5,
        });
      } else {
        gsap.to(burgerIconRef.current, {
          morphSVG: afterBurgerRef.current,
          duration: 0.5,
        });
      }
    });

    burgerRef.current.addEventListener("mouseleave", () => {
      if (navOpened) {
        gsap.to(burgerIconRef.current, {
          morphSVG: closeNavRef.current,
          duration: 0.5,
        });
      } else {
        gsap.to(burgerIconRef.current, {
          morphSVG: burgerIconRef.current,
          duration: 0.5,
        });
      }
    });
  }, [navOpened]);

  useEffect(() => {
    // ! Varibales
    // let cursor = document.querySelector("span.cursor");

    // ? Scale Cursor on Hover
    scaleCursor(logoRef.current);
    scaleCursor(burgerRef.current);

    // ? Magnet Burger
    burgerRef.current.addEventListener("mousemove", (e) => {
      let x = e.offsetX;
      let y = e.offsetY;

      let burgerWidth = burgerRef.current.clientWidth;
      let burgerHeight = burgerRef.current.clientHeight;

      let moveX = x - burgerWidth / 2;
      let moveY = y - burgerHeight / 2;

      burgerRef.current.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });

    burgerRef.current.addEventListener("mouseout", (e) => {
      burgerRef.current.style.transform = ``;
    });
  }, []);

  return (
    <header>
      <div className="logo__wrapper" ref={logoRef}>
        <div className="s icon">
          <S />
        </div>
        <h1 className="text" ref={logoTextRef}>
          URVIVE
        </h1>
      </div>
      <div className="burger" ref={burgerRef}>
        <svg width="75" height="75" viewBox="0 0 75 75" id="burgerIcon">
          <path
            d="M19 5L55.4167 5 M5 27L54.8333 27 M19 49L55.4167 49 "
            stroke="currentColor"
            strokeWidth="10"
            strokeLinecap="round"
            strokeLinejoin="round"
            ref={burgerIconRef}
          />
        </svg>
        <svg width="74" height="75" viewBox="0 0 74 75" id="afterBurger">
          <path
            d="M15.6763 58.5321L37.1841 5.91156 M15.6763 58.5321L68.2968 37.0243 "
            stroke="currentColor"
            strokeWidth="10"
            strokeLinecap="round"
            strokeLinejoin="round"
            ref={afterBurgerRef}
          />
        </svg>
        <svg width="74" height="75" viewBox="0 0 74 75" id="closeNav">
          <path
            d="M57.7404 16.4679L36.2325 69.0884 M57.7404 16.4679L5.11983 37.9757 M56.3262 17.8821L55.6191 18.5892"
            stroke="currentColor"
            strokeWidth="10"
            strokeLinecap="round"
            strokeLinejoin="round"
            ref={closeNavRef}
          />
        </svg>
      </div>
    </header>
  );
}
