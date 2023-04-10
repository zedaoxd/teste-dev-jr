import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 900px;
  width: 90%;
  padding: 2em 1em 1em 1em;
  background: #f0f0f5;

  & > figure {
    text-align: center;
    margin-bottom: 1em;
  }
`;
