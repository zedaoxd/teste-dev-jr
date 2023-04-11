import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  & > form {
    width: 70%;
    display: flex;
    align-items: baseline;
    justify-content: space-between;
  }
`;

export const Button = styled.button`
  background: #000;
  color: #fff;
  border: 0;
  border-radius: 0.2em;
  padding: 0.3em 0.3em 0.12rem 0.3em;
  font-size: 1.5em;

  svg {
    margin: 0;
  }
`;

export const Input = styled.input`
  width: 70%;
  height: 2.5em;
  border: 1px solid gray;
  border-radius: 0.2rem;
  padding: 0.5em;
  font-size: 1em;

  &:focus {
    outline: none;
  }
`;

export const Select = styled.select`
  width: 20%;
  height: 2.4em;
  border: 1px solid gray;
  border-radius: 0.2rem;
  padding: 0.5em;
  background: #fff;
  color: #000;
  font-size: 1em;
  text-transform: capitalize;

  &:focus {
    outline: none;
  }
`;
