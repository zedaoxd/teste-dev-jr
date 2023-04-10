import styled from "styled-components";

export const Container = styled.nav`
  display: flex;
  min-width: 150px;
  width: 10%;
  flex-direction: column;
  align-items: center;
  margin: 0;
  background-color: #fff;
  gap: 10px;

  a {
    text-decoration: none;
    height: 30px;
    width: 100%;
    color: #000;
    font-size: 1.2rem;
    font-weight: 600;
    padding: 5px 10px;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 5px;
    transition: 0.2s;

    &:hover {
      background-color: #ccc;
    }
  }

  .active {
    color: #666;
  }
`;
