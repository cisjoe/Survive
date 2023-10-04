import React from "react";

export function BurgerIcon({ref}) {
  return (
    <svg
      width="61"
      height="54"
      viewBox="0 0 61 54"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      id="burgerIcon"
      >
      <path
        d="M19 5L55.4167 5"
        stroke="black"
        strokeWidth="10"
        strokeLinecap="round"
        strokeLinejoin="round"
        ref={ref}
      />
      <path
        d="M19 49L55.4167 49"
        stroke="black"
        strokeWidth="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5 27L54.8333 27"
        stroke="black"
        strokeWidth="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function AfterBurger({ref}) {
  return (
    <svg
      width="74"
      height="75"
      viewBox="0 0 74 75"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      id="afterBurger"
      >
      <path
        d="M15.6763 58.5321L37.1841 5.91156"
        stroke="black"
        strokeWidth="10"
        strokeLinecap="round"
        strokeLinejoin="round"
        ref={ref}
      />
      <path
        d="M15.6763 58.5321L68.2968 37.0243"
        stroke="black"
        strokeWidth="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.0905 57.1179L17.7976 56.4108"
        stroke="black"
        strokeWidth="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
