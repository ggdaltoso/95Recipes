import React from "react";
import styled from "@xstyled/styled-components";
import gif from "./hourglass.gif";

const Wrapper = styled.div`
  position: fixed;
  background-color: rgba(0, 0, 0, 0.2);
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9999999;
`;

const Hourglass = styled.img`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 30px;
`;

const Loading = () => (
  <Wrapper>
    <Hourglass src={gif} />
  </Wrapper>
);

export default Loading;
