export default function circleCursor() {
  let cursor = document.querySelector(".cursor");

  document.body.addEventListener("pointermove", (e) => {
    cursor.style.visibility = "visible";
    let x = e.pageX;
    let y = e.pageY;

    let centX = cursor.getBoundingClientRect().width / 2;
    let centY = cursor.getBoundingClientRect().height / 2;

    cursor.style.left = `${x - centX}px`;
    cursor.style.top = `${y - centY}px`;
  });
}
