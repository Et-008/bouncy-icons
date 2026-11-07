const code = `import Button from "../Button";
import { type RefObject, useEffect, useRef } from "react";
import { animate } from "motion";

export default function Youtube() {
  const svgRef: RefObject<null | HTMLButtonElement> = useRef(null);

  function checkPrefersReducedMotion() {
    return !window.matchMedia("(prefers-reduced-motion: no-preference)")
      .matches;
  }

  function hoverAnimation() {
    if (checkPrefersReducedMotion()) {
      return;
    }

    animate(
      "#plaque",
      {
        scale: [0.6, 1],
        fill: "#FF0033",
        stroke: "#FF0033",
      },
      {
        type: "spring",
        bounce: 1,
        duration: 2,
        delay: 0.2,
        ease: [0.5, 0.5, 0.2, 1.01],
      }
    );

    return animate(
      "#play",
      {
        rotate: 360,
      },
      {
        type: "spring",
        bounce: 0.5,
        duration: 0.5,
        delay: 0.2,
        ease: [0.5, 0.5, 0.2, 1.01],
      }
    );
  }

  function defaultAnimation() {
    if (checkPrefersReducedMotion()) {
      return;
    }

    animate("#plaque", {
      scale: 1,
      fill: "currentcolor",
      stroke: "currentcolor",
    });
    animate("#play", {
      rotate: 0,
    });
  }

  useEffect(() => {
    const node = svgRef.current;
    let timer: number;
    if (node) {
      timer = setTimeout(
        () => hoverAnimation()?.then(() => defaultAnimation()),
        500
      );
      node.addEventListener("pointerenter", hoverAnimation);

      node.addEventListener("mouseleave", defaultAnimation);
    }

    return () => {
      clearTimeout(timer);
    };
  });

  return (
    <Button propRef={svgRef} id="Youtube" variant="ghost">
      <svg
        width="36"
        height="32"
        viewBox="0 0 32 36"
        style={{
          stroke: "var(--text-main)",
          fill: "var(--text-main)",
        }}
      >
        <path
          id="plaque"
          d="M 5, 5 C 5 5, 2 5, 2 10
            L 2 20
            C 2 20, 2 25, 5 25
            L 30 25
            C 30 25, 35 25, 35 20
            L 35 10
            C 35 10, 35 5, 30 5
            L 5 5
        "
        />
        <polygon
          id="play"
          points="15 10, 25 15, 15 20"
          style={{
            transformOrigin: "33% 50%",
            transformBox: "fill-box",
            fill: "var(--text-on-primary)",
            stroke: "var(--text-on-primary)",
          }}
        />
      </svg>
    </Button>
  );
}
`;
export default code;
