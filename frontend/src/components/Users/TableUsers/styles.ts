import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
`;

export const Table = styled.table`
  width: 100%;
  border-spacing: 0 0.5rem;

  th {
    color: #000;
    font-weight: 600;
    padding: 1rem 0 0.5rem 0;
    text-align: left;
    border-top: 1px solid #ccc;
  }

  td {
    border-top: 1px solid #ccc;
    padding: 1rem 0 0.5rem 0;
  }

  td:last-child {
    text-align: right;
    width: 100px;
  }

  button {
    background: #000;
    color: #fff;
    border: 0;
    border-radius: 0.2em;
    padding: 0.2em 0.2em 0.1rem 0.2em;
    font-size: 1em;

    svg {
      margin: 0;
    }

    & + button {
      margin-left: 0.5rem;
    }
  }
`;
