import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 50em;
  padding: 2em 1em 1em 1em;
  border-radius: 0.3em;
  background: #f0f0f5;

  & > figure {
    text-align: center;
    margin-bottom: 1em;
  }
`;
