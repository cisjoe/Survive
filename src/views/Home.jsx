// ! React
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

// ! Components
import Header from "../components/header";

// ! Gsap
import gsap from "gsap";
import {
  CustomEase,
  DrawSVGPlugin,
  MorphSVGPlugin,
  ScrollTrigger,
  SplitText,
} from "gsap/all";

// ! Internal Imports
import scaleCursor from "../utils/scaleCursor";
import circleCursor from "../utils/circleCursor";

// ! Media
import S from "/public/S";
import landingVideo from "../assets/media/videos/landing-video.mp4";
import startIcon from "../assets/media/images/start-icon.png";
import way from "../assets/media/images/way.jpg";
import trip from "../assets/media/images/trip.jpg";
import hiking from "../assets/media/images/hiking.jpg";
import ready from "../assets/media/images/ready.jpg";
import Loading from "../components/Loading";

gsap.registerPlugin(
  SplitText,
  ScrollTrigger,
  CustomEase,
  MorphSVGPlugin,
  DrawSVGPlugin
);

let loaded = 0;

export default function Home() {
  // ? Scroll to Top Every Time "Home" Component Loads
  window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  };

  // ! Refs
  const scrollerSVGRef = useRef(null);
  const scrollCircleRef = useRef(null);
  const navRef = useRef(null);
  const landingVidRef = useRef(null);
  const videoWrapperRef = useRef(null);
  const startIconRef = useRef(null);
  const musicMuterRef = useRef(null);

  // ! States
  const [navOpened, setNavOpened] = useState(false);
  const [appLoaded, setAppLoaded] = useState(false);

  window.addEventListener("load", () => {
    setAppLoaded(true);
  });

  useEffect(() => {
    // ! Variables
    let header = document.querySelector("header");
    let burger = header.querySelector(".burger");
    let logoWrapper = header.querySelector(".logo__wrapper");
    let logoIcon = header.querySelector(".s.icon");
    let logoText = header.querySelector("h1.text");
    const videoTL = gsap.timeline();

    // ? Scroller
    let docHeight = document.documentElement.offsetHeight;
    gsap.fromTo(
      scrollCircleRef.current,
      { drawSVG: 0 },
      {
        drawSVG: "102%",
        scrollTrigger: {
          trigger: document.documentElement,
          start: "0px",
          end: `+=${docHeight}`,
          scrub: 1,
        },
      }
    );

    gsap.to(scrollerSVGRef.current, {
      rotate: docHeight / 3,
      scrollTrigger: {
        trigger: document.documentElement,
        start: "0px",
        end: `+=${docHeight}`,
        scrub: 1,
      },
    });

    // ? Home Start Animation
    gsap.to(logoWrapper, {
      duration: 2,
      opacity: 1,
      delay: 1,
      filter: "blur(0px)",
      y: "100px",
    });

    gsap.to(videoWrapperRef.current, {
      duration: 2,
      delay: 1,
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
    });

    // ? Video Animations on CLick
    function videoClick() {
      landingVidRef.current.play();
      videoTL
        .to(videoWrapperRef.current, {
          duration: 3,
          transform: "scale(1)",
          ease: CustomEase.create(
            "custom",
            "M0,0,C0.33,0.364,0.329,0.452,0.376,0.51,0.44,0.59,0.332,1,1,1"
          ),
          borderRadius: 0,
          zIndex: -1,
          onComplete: () => {
            gsap.to(videoWrapperRef.current, { border: "none" });
            gsap.to(".video__overlay", { duration: 3, opacity: 1 });
            gsap.to(".video__overlay h1 span", {
              delay: 1,
              duration: 0.5,
              scale: 1 / 5,
              opacity: 1,
              ease: CustomEase.create(
                "custom",
                "M0,0,C0.33,0.364,0.329,0.452,0.376,0.51,0.44,0.59,0.332,1,1,1"
              ),
            });
            gsap.set("body", { overflow: "auto" });
          },
        })
        .to(
          logoWrapper,
          {
            duration: 2,
            ease: CustomEase.create(
              "custom",
              "M0,0,C0.33,0.364,0.329,0.452,0.376,0.51,0.44,0.59,0.332,1,1,1"
            ),
            translate: 0,
          },
          "<0.7"
        )
        .to(
          burger,
          {
            visibility: "visible",
            onComplete: () => {
              gsap.to(burger, {
                duration: 2,
                clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
              });
            },
          },
          "<0.3"
        );

      // ? Collapse Logo on Video CLick
      let splitted = new SplitText(logoText, { type: "chars" });
      gsap.to(splitted.chars, {
        duration: 1,
        filter: "blur(10px)",
        xPercent: -200,
        opacity: 0,
        transform: "scaleX(0)",
        stagger: {
          amount: 0.5,
          from: "end",
        },
      });

      // ? Hovering Timeline
      const hoveringTL = gsap.timeline();

      // ? Expand Logo on Hover
      logoWrapper.addEventListener("mouseenter", () => {
        hoveringTL.to(splitted.chars, {
          duration: 1,
          filter: "blur(0px)",
          xPercent: 0,
          opacity: 1,
          transform: "scaleX(1)",
          stagger: {
            amount: 0.5,
            from: "start",
          },
        });
      });

      // ? Collapse Logo on Leave
      logoWrapper.addEventListener("mouseleave", () => {
        hoveringTL.clear();
        hoveringTL.to(splitted.chars, {
          duration: 1,
          filter: "blur(10px)",
          xPercent: -200,
          opacity: 0,
          transform: "scaleX(0)",
          stagger: {
            amount: 0.5,
            from: "end",
          },
        });
      });

      // ? Switch Header Colors from White to Black
      gsap.to(header, {
        color: "black",
        duration: 3,
      });

      // ? Hide Video StartIcon
      gsap.to(startIconRef.current, {
        duration: 1,
        opacity: 0,
        onComplete: () => {
          gsap.to(startIconRef.current, { display: "none" });
        },
      });

      // ? Mute the Video
      musicMuterRef.current.addEventListener("click", () => {
        if (landingVidRef.current.muted) {
          document.querySelector("span.mute__bar").style.width = "0%";
          landingVidRef.current.muted = false;
        } else {
          document.querySelector("span.mute__bar").style.width = "100%";
          landingVidRef.current.muted = true;
        }
      });
    }

    // ? Fire Fnc on CLick
    landingVidRef.current.addEventListener("click", () => {
      videoClick();
    });

    // ? Scale Cursor on Hover
    scaleCursor(musicMuterRef.current);
    scaleCursor(landingVidRef.current);

    gsap.utils.toArray("nav ul li a").forEach((link) => scaleCursor(link));

    gsap.utils.toArray(".links a").forEach((link) => scaleCursor(link));

    // ? Circle Cursor
    circleCursor();

    // ? Pin the Images While Texts are Scrolling
    ScrollTrigger.create({
      trigger: ".gallery",
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      pin: ".images",
      // markers: true,
    });

    // ? Change Header Colors onEnter an onLeave the Footer
    gsap.to(header, {
      duration: 1,
      color: "white",
      scrollTrigger: {
        trigger: "footer",
        start: "top 2%",
        scrub: true,
        // markers: true,
        onLeaveBack: () => {
          gsap.to(header, { color: "black" });
        },
        onEnterBack: () => {
          gsap.to(header, { color: "white" });
        },
      },
    });

    // ? Change MusicIcon Colors onEnter an onLeave the Footer
    let musicIconSVG = musicMuterRef.current.querySelector("svg");
    gsap.to(musicIconSVG, {
      duration: 1,
      color: "white",
      scrollTrigger: {
        trigger: "footer",
        start: "top bottom",
        scrub: true,
        // markers: true,
        onLeaveBack: () => {
          gsap.to(musicIconSVG, {
            color: "black",
          });
        },
        onEnterBack: () => {
          gsap.to(musicIconSVG, {
            color: "white",
          });
        },
      },
    });

    // ? Images 3d Scroll
    const imagesTL = gsap.timeline({
      scrollTrigger: {
        trigger: ".gallery",
        start: "top top",
        scrub: true,
        // markers: true,
      },
    });

    // ? Scale the Images Wrapper to the Original Size onScroll "scrub"
    imagesTL
      .to(".images__wrapper", {
        duration: 10,
        rotateX: 360,
        ease: "none",
      })
      .to(
        ".images",
        {
          scale: 0.5,
        },
        ">-10"
      );

    // ? Translate & Scale ImagesDiv to Original Position onScroll "scrub"
    gsap.to(".images", {
      x: 0,
      rotate: "0deg",
      scrollTrigger: {
        trigger: ".gallery",
        start: "top center",
        end: "10%",
        scrub: true,
      },
    });

    // ? Play Video Animation if It's Second Time "Home" Component Loads "navigated to"
    if (loaded > 1) {
      landingVidRef.current.muted = true;
      videoClick();
      document.querySelector("span.mute__bar").style.width = "100%";
    }
  }, []);

  // ? Nav Animation and Changing Black Colors "Header & MusicIcon" to White
  useEffect(() => {
    let header = document.querySelector("header");
    let burger = header.querySelector(".burger");
    let musicIconSVG = musicMuterRef.current.querySelector("svg");

    burger.addEventListener("click", () => {
      if (navOpened) {
        setNavOpened(false);
        gsap.to(navRef.current, {
          scale: 0,
          duration: 1,
          ease: CustomEase.create(
            "custom",
            "M0,0,C0.33,0.364,0.329,0.452,0.376,0.51,0.44,0.59,0.332,1,1,1"
          ),
          onComplete: () => {
            gsap.to(header, {
              color: "black",
            });
            gsap.to(musicIconSVG, {
              color: "black",
            });
          },
        });
      } else {
        setNavOpened(true);
        gsap.to(navRef.current, {
          scale: 1,
          duration: 1,
          ease: CustomEase.create(
            "custom",
            "M0,0,C0.33,0.364,0.329,0.452,0.376,0.51,0.44,0.59,0.332,1,1,1"
          ),
          onComplete: () => {
            gsap.to(header, {
              color: "white",
            });
            gsap.to(musicIconSVG, {
              color: "white",
            });
          },
        });
      }
    });
  }, [navOpened]);

  loaded++;

  return (
    <div className="Home">
      {!appLoaded && <Loading />}
      <svg
        className="scroll-circle"
        width="24"
        height="24"
        viewBox="0 0 48 48"
        fill="none"
        ref={scrollerSVGRef}
      >
        <circle
          cx="24"
          cy="24"
          r="20"
          stroke="currentColor"
          strokeWidth="6"
          ref={scrollCircleRef}
        />
      </svg>
      <span className="cursor"></span>
      <div className="landing">
        <div className="frame">
          <Header navOpened={navOpened} />
          <nav ref={navRef}>
            <ul className="nav__list">
              <li>
                <Link to={"/about"}>about</Link>
              </li>
              <li>
                <Link to={"/rules"}>rules</Link>
              </li>
            </ul>
          </nav>
          <div className="mute__music" ref={musicMuterRef}>
            <svg width="24" height="24">
              <path
                d="M20.227 3a.715.715 0 0 0-.143.02L10.25 5.252A2.26 2.26 0 0 0 8.5 7.447v8.7a4.293 4.293 0 0 0-2.25-.647c-.98 0-1.883.291-2.57.809-.69.517-1.18 1.3-1.18 2.191 0 .89.49 1.674 1.18 2.191.687.518 1.59.809 2.57.809.98 0 1.883-.291 2.57-.809.69-.517 1.18-1.3 1.18-2.191 0-.027-.02-.047-.02-.072a.786.786 0 0 0 .02-.178v-7.4l9.5-2.16v5.457a4.293 4.293 0 0 0-2.25-.647c-.98 0-1.883.291-2.57.809-.69.517-1.18 1.3-1.18 2.191 0 .89.49 1.674 1.18 2.191.687.518 1.59.809 2.57.809.98 0 1.883-.291 2.57-.809.69-.517 1.18-1.3 1.18-2.191 0-.027-.02-.047-.02-.072a.79.79 0 0 0 .02-.178V3.75a.75.75 0 0 0-.773-.75ZM19.5 4.69v2.46L10 9.31V7.448c0-.353.238-.652.584-.73L19.5 4.689ZM17.25 15c.676 0 1.275.21 1.672.508.394.299.578.64.578.992s-.184.693-.578.992c-.397.297-.996.508-1.672.508-.676 0-1.275-.21-1.672-.508-.394-.299-.578-.64-.578-.992s.184-.693.578-.992c.397-.297.996-.508 1.672-.508Zm-11 2c.676 0 1.275.21 1.672.508.394.299.578.64.578.992s-.184.693-.578.992c-.397.297-.996.508-1.672.508-.676 0-1.275-.21-1.672-.508-.394-.299-.578-.64-.578-.992s.184-.693.578-.992C4.975 17.21 5.574 17 6.25 17Z"
                fill="currentColor"
              />
            </svg>
            <span className="mute__bar"></span>
          </div>
        </div>
        <div className="video__wrapper" ref={videoWrapperRef}>
          <div className="video__overlay">
            <h1>YOU HAVE TO LIVE</h1>
            <br />
            <h1>
              YOU HAVE TO <span>SURVIVE</span>
            </h1>
          </div>
          <img
            src={startIcon}
            alt="Start Icon"
            className="start-icon"
            ref={startIconRef}
          />
          <video className="landing__video" loop ref={landingVidRef}>
            <source src={landingVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
      <div className="home__secs">
        <div className="gallery">
          <div className="content">
            <div className="text"></div>
            <div className="text">
              <h1>Don't lose your way!</h1>
            </div>
            <div className="text">
              <h1>It's gonna be a long trip</h1>
            </div>
            <div className="text">
              <h1>and you Have to Hike</h1>
            </div>
            <div className="text">
              <h1>But you are ready</h1>
            </div>
          </div>
          <div className="images">
            <div className="images__wrapper">
              <div className="img__wrapper">
                <div className="text">
                  <h1>
                    don't go back <br /> just look
                  </h1>
                </div>
              </div>
              <div className="img__wrapper">
                <img src={way} alt="Survival Tools" />
              </div>
              <div className="img__wrapper">
                <img src={trip} alt="Survival Tools" />
              </div>
              <div className="img__wrapper">
                <img src={hiking} alt="Survival Tools" />
              </div>
              <div className="img__wrapper">
                <img src={ready} alt="Survival Tools" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer>
        <div className="text">
          <h1>no one gonna help you!</h1>
          <br />
          <h1>
            YOU HAVE TO{" "}
            <span>
              <S />
              URVIVE
            </span>
          </h1>
        </div>
        <div className="links">
          <Link to="/about">about</Link>
          <Link to="/rules">rules</Link>
        </div>
      </footer>
    </div>
  );
}
