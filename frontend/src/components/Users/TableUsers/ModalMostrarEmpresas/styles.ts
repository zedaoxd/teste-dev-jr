import styled from "styled-components";

export const Container = styled.div`
  padding: 0 20px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 50px;

  h1 {
    font-size: 1.5rem;
    font-weight: 600;
    color: #000;
  }

  button {
    background: transparent;
    border: 0;
  }
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
`;
