import styled from "styled-components";

export const Header = styled.header`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  border-bottom: 1px solid #ccc;
  padding: 1rem;

  h2 {
    font-size: 1.5rem;
    font-weight: 600;
  }

  button {
    background: transparent;
    border: 0;
    color: #000;
  }
`;

export const From = styled.form`
  width: 100%;
  margin-bottom: 1rem;
  padding: 0 1rem 1rem 1rem;

  label {
    display: block;
    font-size: 1rem;
    margin: 0.5rem 0 0.5rem 0;
  }

  input {
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 0.2em;
    padding: 0.5rem;

    & + input {
      margin-top: 0.5rem;
    }

    &::placeholder {
      color: #ccc;
    }

    &:focus {
      outline: none;
    }
  }
`;

export const ContainerTelefoneData = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;

  > div {
    width: 49%;
  }
`;

export const ContainerReactSelect = styled.div`
  margin-top: 1rem;
`;

export const ContainerButtonsFrom = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 1rem;

  button {
    background: #000;
    color: #fff;
    border: 0;
    border-radius: 0.2em;
    padding: 0.5rem 1rem;
    font-size: 1em;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    svg {
      margin: 0;
      font-size: 1.2rem;
    }

    &:disabled {
      background: #ccc;
      color: #000;
      cursor: not-allowed;
    }
  }
`;
