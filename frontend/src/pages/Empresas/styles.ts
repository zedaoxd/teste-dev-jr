import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;

  > div {
    display: flex;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    position: relative;

    &::before,
    &::after {
      content: "";
      position: absolute;
      z-index: -1;
      width: 100%;
      height: 100%;
      background: linear-gradient(45deg, #000, #ccc, #000, #ccc);
      background-size: 300%;
      animation: animateBorder 15s linear alternate infinite;
      border-radius: 8px;
    }

    &::after {
      filter: blur(50px);
    }

    @keyframes animateBorder {
      0% {
        background-position: 0;
      }
      100% {
        background-position: 300%;
      }
    }
  }
`;
