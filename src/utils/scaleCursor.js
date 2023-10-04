import gsap from "gsap";

export default function scaleCursor(element, cursor) {
  let cursorSpan = document.querySelector('span.cursor')

  element.addEventListener("mouseenter", () => {
    gsap.to(cursorSpan, {
      width: "3rem",
      height: "3rem",
    });
  });

  element.addEventListener("mouseleave", () => {
    gsap.to(cursorSpan, {
      width: "1rem",
      height: "1rem",
    });
  });
}
