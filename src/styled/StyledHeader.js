import styled from 'styled-components';

const StyledHeader = styled.header`
  background-color: ${(props) => props.theme.mainColor};
  color: ${(props) => props.theme.secondaryColor};
  width: 100%;
  height: 60px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;

  button {
    height: auto;
    background-color: ${(props) => props.theme.mainColor};
    color: ${(props) => props.theme.secondaryColor};
    border: 2px solid ${(props) => props.theme.secondaryColor};
    border-radius: 5px;
    padding: 10px;
    font-size: 14px;
    font-weight: 600;
    transition: 0.2s;
    display: flex;
    align-items: center;

    img {
      background-color: ${(props) => props.theme.mainColor};
      color: ${(props) => props.theme.accent};
    }
  }

  button:hover {
    cursor: pointer;
    background-color: ${(props) => props.theme.secondaryColor};
    color: ${(props) => props.theme.mainColor};
  }
`;

export default StyledHeader;
