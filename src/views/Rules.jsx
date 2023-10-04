// ! React
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

// ! Gsap
import gsap from "gsap";
import Observer from "gsap/Observer";
import { SplitText } from "gsap/all";

// ! Internal Imports
import circleCursor from "../utils/circleCursor";
import scaleCursor from "../utils/scaleCursor";

gsap.registerPlugin(Observer, SplitText);

export default function Rules() {
  useEffect(() => {
    // ? Circle Cursor
    circleCursor();

    // ? Scale Cursor on Hover
    gsap.utils.toArray(".links a").forEach((link) => scaleCursor(link));

    // ? Sroll
    let sections = document.querySelectorAll("section"),
      images = document.querySelectorAll(".rule__img"),
      headings = gsap.utils.toArray(".section__heading"),
      outerWrappers = gsap.utils.toArray(".outer"),
      innerWrappers = gsap.utils.toArray(".inner"),
      splitHeadings = headings.map(
        (heading) =>
          new SplitText(heading, {
            type: "chars,words,lines",
            linesClass: "clip-text",
          })
      ),
      currentIndex = -1,
      animating;

    let clamp = gsap.utils.clamp(0, sections.length - 1);

    // gsap.set(outerWrappers, { yPercent: 100 });
    // gsap.set(innerWrappers, { yPercent: -100 });

    function gotoSection(index, direction) {
      index = clamp(index); // make sure it's valid

      // If they are the same, it's either the first or last slide
      if (index === currentIndex) {
        return;
      }

      animating = true;
      let fromTop = direction === -1,
        dFactor = fromTop ? -1 : 1,
        tl = gsap.timeline({
          defaults: { duration: 1.25, ease: "power1.inOut" },
          onComplete: () => (animating = false),
        });

      if (currentIndex >= 0) {
        // The first time this function runs, current is -1
        gsap.set(sections[currentIndex], { zIndex: 0 });

        tl.to(images[currentIndex], { yPercent: -15 * dFactor }).set(
          sections[currentIndex],
          { autoAlpha: 0 }
        );
      }

      gsap.set(sections[index], { autoAlpha: 1, zIndex: 1 });

      tl.fromTo(
        [outerWrappers[index], innerWrappers[index]],
        { yPercent: (i) => (i ? -100 * dFactor : 100 * dFactor) },
        { yPercent: 0 },
        0
      )
        .fromTo(images[index], { yPercent: 15 * dFactor }, { yPercent: 0 }, 0)
        .fromTo(
          splitHeadings[index].chars,
          { autoAlpha: 0, yPercent: 150 * dFactor },
          {
            autoAlpha: 1,
            yPercent: 0,
            duration: 1,
            ease: "power2",
            stagger: {
              each: 0.05,
              from: "random",
            },
          },
          0.2
        );

      currentIndex = index;
      return tl;
    }

    Observer.create({
      type: "wheel,touch,pointer",
      wheelSpeed: -1,
      onDown: () => {
        !animating && gotoSection(currentIndex - 1, -1);
      },
      onUp: () => {
        !animating && gotoSection(currentIndex + 1, 1);
      },
      tolerance: 10,
    });

    gotoSection(0, 1);
  }, []);

  return (
    <div className="Rules">
      <span className="cursor"></span>
      <div className="links">
        <Link to="/">home</Link>
        <Link to="/about">about</Link>
      </div>
      <section className="first">
        <div className="outer">
          <div className="inner">
            <div className="rule__img">
              <h2 className="section__heading">
                The rules of survival never change, whether you’re in a desert,
                forest or in an arena.
              </h2>
            </div>
          </div>
        </div>
      </section>
      <section className="second">
        <div className="outer">
          <div className="inner">
            <div className="rule__img">
              <h2 className="section__heading">Water</h2>
            </div>
          </div>
        </div>
      </section>
      <section className="third">
        <div className="outer">
          <div className="inner">
            <div className="rule__img">
              <h2 className="section__heading">fire</h2>
            </div>
          </div>
        </div>
      </section>
      <section className="fourth">
        <div className="outer">
          <div className="inner">
            <div className="rule__img">
              <h2 className="section__heading">signal</h2>
            </div>
          </div>
        </div>
      </section>
      <section className="fifth">
        <div className="outer">
          <div className="inner">
            <div className="rule__img">
              <h2 className="section__heading">shelter</h2>
            </div>
          </div>
        </div>
      </section>
      <section className="sixth">
        <div className="outer">
          <div className="inner">
            <div className="rule__img">
              <h2 className="section__heading">food</h2>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
