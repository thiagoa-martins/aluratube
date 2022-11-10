import React from "react";

import styled from "styled-components";

import sunSvg from "../../../assets/icons/sun.svg";
import moonSvg from "../../../assets/icons/moon.svg";

const StyledDarkModeSwitch = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #383838;
  border-radius: 17px;
  background: #181818;
  opacity: 1;
  cursor: pointer;

  &:focus,
  &:hover {
    opacity: 1;
  }

  > div {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    border: none;
    border-radius: 50%;
  }

  .moon {
    background-color: ${({ mode }) => (mode ? "#181818" : "#fff")};

    img {
      display: ${({ mode }) => (mode ? "block" : "none")};
    }
  }

  .sun {
    background-color: ${({ mode }) => (mode ? "#fff" : "#181818")};

    img {
      display: ${({ mode }) => (mode ? "none" : "block")};
    }
  }
`;

export function DarkModeSwitch({ mode, setMode }) {
  return (
    <StyledDarkModeSwitch
      mode={mode}
      onClick={() => {
        if (mode === 1) {
          setMode(0);
          return;
        }

        setMode(1);
      }}
    >
      <div className="moon">
        <img src={moonSvg.src} alt="Moon" />
      </div>
      <div className="sun">
        <img src={sunSvg.src} alt="Sun" />
      </div>
    </StyledDarkModeSwitch>
  );
}
