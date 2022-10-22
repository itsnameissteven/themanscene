import React from "react";

// Hooks
import { Glitter } from "neat-treats";

// Components

// Utils

// Styles
import styles from "./GoFuckYourSelf.module.scss";

// Interfaces and Types

export interface IGoFuckYourSelfProps {
  /** Optional classname to pass to parent container */
  className?: string;
  /** Width and size of element */
  width?: string | number;
  /** stripe colors */
  colors?: {
    one: string;
    two: string;
    three: string;
  };
}

const GoFuckYourSelf = ({
  className = "",
  width = 150,
  colors = {
    three: "#e76f51",
    one: "#f4a261",
    two: "#e9c46a",
  },
}: IGoFuckYourSelfProps) => {
  // State

  // Hooks

  // Interaction Handlers

  // Display Methods

  const textShaddow = (shaddowDepth = 1) => {
    const colorsPallet = [colors.one, colors.two, colors.three];
    const shaddowString = colorsPallet.reduce(
      (acc, color) => {
        for (let i = 0.01; i < shaddowDepth; i += 0.01) {
          const { count } = acc;
          acc.str += `${count}rem ${count}rem ${color},`;
          acc.count += 0.01;
        }
        return acc;
      },
      { str: "", count: 0.01 }
    );

    return shaddowString.str.slice(0, -1);
  };
  // Return
  return (
    <div className={`${styles.goFuckYourSelf} ${className}`}>
      <div className={styles.content}>
        <div className={styles.textContainer}>
          <Glitter className={styles.glitter}>
            <h1 className={styles.text}>Go Fuck Yourself</h1>
          </Glitter>
        </div>
      </div>
      <svg
        width="100%"
        height="100%"
        viewBox="0 -20 150 900"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <path
          d="M4 0V430C4 441.046 12.9543 450 24 450H60.25H125.5C131.023 450 135.5 454.477 135.5 460V593.5V900"
          stroke={colors.three}
          className={styles.pathThree}
          strokeWidth="5"
        />
        <path
          d="M14 0V430C14 435.523 18.4772 440 24 440H79.75H125.5C136.546 440 145.5 448.954 145.5 460V588.5V900"
          stroke={colors.one}
          className={styles.path}
          strokeWidth="5"
        />
        <path
          d="M9 0V430C9 438.284 15.7157 445 24 445H74.75H125.5C133.784 445 140.5 451.716 140.5 460V591.75V900"
          stroke={colors.two}
          className={styles.pathTwo}
          strokeWidth="5"
        />
      </svg>
    </div>
  );
};

export default GoFuckYourSelf;
