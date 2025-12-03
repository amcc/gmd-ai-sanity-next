"use client";

import dynamic from "next/dynamic";

/* eslint-disable @typescript-eslint/no-explicit-any */

const Sketch = dynamic(() => import("react-p5"), {
  ssr: false,
});

interface Point {
  x: number;
  y: number;
  r: number;
  l: number;
}

export function ArrowSketch() {
  let points: Point[] = [];
  const numPoints = 200;
  let sw = 1;
  const colourBlue = [150, 150, 255] as const;
  let cSize: number;
  let length: number;
  const lengthScale = 6;
  const lerpRate = 0.1;
  const lerpRateVariance = 0.3;
  const startArrows = 30;

  const randomLerpRate = (p5: any) => {
    return p5.random(
      lerpRate * lerpRateVariance,
      lerpRate * ((1 - lerpRateVariance) * 2 + lerpRateVariance)
    );
  };

  const addArrow = (p5: any, xPos: number, yPos: number) => {
    points.push({
      x: xPos,
      y: yPos,
      r: p5.random(p5.TWO_PI),
      l: randomLerpRate(p5),
    });
  };

  const lookAtMe = (p5: any, point: Point, length: number) => {
    const { x, y, r } = point;
    p5.push();
    p5.stroke(colourBlue[0], colourBlue[1], colourBlue[2]);
    p5.strokeWeight(sw);
    p5.strokeCap(p5.ROUND);
    p5.translate(x, y);
    const angle = p5.atan2(p5.mouseY - y, p5.mouseX - x);

    let deltaAngle = angle - r;

    // Ensure the shortest rotation direction
    if (deltaAngle > p5.PI) {
      deltaAngle -= p5.TWO_PI;
    } else if (deltaAngle < -p5.PI) {
      deltaAngle += p5.TWO_PI;
    }

    // Lerp the current rotation toward the target angle
    const lerpRotation = p5.lerp(r, r + deltaAngle, point.l);
    point.r = lerpRotation;
    p5.rotate(lerpRotation);

    p5.line(-length, 0, 0, 0);
    p5.line(-length / 3, -length / 3, 0, 0);
    p5.line(-length / 3, length / 3, 0, 0);

    p5.pop();
  };

  const setup = (p5: any, canvasParentRef: Element) => {
    // Create a full-viewport canvas and attach to parent
    p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);

    if (p5.width < 500) {
      sw = 1;
    }

    points = [];
    cSize = p5.min(p5.windowWidth, p5.windowHeight);
    length = (cSize * lengthScale) / numPoints;

    for (let i = 0; i < startArrows; i++) {
      const x = p5.random(p5.width);
      const y = p5.random(p5.height);
      addArrow(p5, x, y);
    }
  };

  const draw = (p5: any) => {
    p5.background(255);

    for (let i = 0; i < points.length; i++) {
      lookAtMe(p5, points[i], length);
    }
  };

  const mouseDragged = (p5: any) => {
    if (p5.frameCount % 3 === 0) {
      addArrow(p5, p5.mouseX, p5.mouseY);
    }
  };

  //   const mousePressed = (p5: any) => {
  //     addArrow(p5, p5.mouseX, p5.mouseY);
  //   };

  const windowResized = (p5: any) => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
    // Keep existing arrows but recalc stroke width and length
    if (p5.width < 500) {
      sw = 1;
    } else {
      sw = 2;
    }
    cSize = p5.min(p5.windowWidth, p5.windowHeight);
    length = (cSize * lengthScale) / numPoints;
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 0,
      }}
    >
      <Sketch
        setup={setup}
        draw={draw}
        mouseDragged={mouseDragged}
        // mousePressed={mousePressed}
        windowResized={windowResized}
      />
    </div>
  );
}
