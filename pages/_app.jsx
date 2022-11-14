import React from "react";
import { ThemeProvider } from "styled-components";

import { CSSReset } from "../src/components/CSSReset";
import { RegisterVideo } from "../src/components/RegisterVideo";

import {
  ColorModeProvider,
  ColorModeContext,
} from "../src/components/Menu/components/ColorModeProvider";

const theme = {
  light: {
    backgroundBase: "#f9f9f9",
    backgroundLevel1: "#ffffff",
    backgroundLevel2: "#f0f0f0",
    borderBase: "#e5e5e5",
    textColorBase: "#222222",
  },
  dark: {
    backgroundBase: "#181818",
    backgroundLevel1: "#202020",
    backgroundLevel2: "#313131",
    borderBase: "#383838",
    textColorBase: "#FFFFFF",
  },
};

function ProviderWrapper(props) {
  return (
    <ColorModeProvider initialMode={"dark"}>{props.children}</ColorModeProvider>
  );
}

export function Root({ Component, pageProps }) {
  const context = React.useContext(ColorModeContext);
  
  return (
    <>
      <ThemeProvider theme={theme[context.mode]}>
        <CSSReset />
        <Component {...pageProps} />
        <RegisterVideo />
      </ThemeProvider>
    </>
  );
}

export default function _App(props) {
  return (
    <ProviderWrapper>
      <Root {...props} />
    </ProviderWrapper>
  );
}
