import styled from 'styled-components';

const StyledFooter = styled.footer`
  box-shadow: 2px 2px 10px 10px rgba(255,255,255,0.27);
  background-color: ${(props) => props.theme.mainColor};
  color: ${(props) => props.theme.mainColor};
  width: 100%;
  height: 60px;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
  align-items: center;
  bottom: 0;
  position: fixed;

  button {
    background-color: transparent;
    border: unset;
    padding: 10px;
    text-align: center;
    width: 54px;
    
    &:hover {
      cursor: pointer;
    }
  }

  .currentPath {
    background-color: ${(props) => props.theme.dark};
    border-radius: 10px;
    img {
      filter: invert(100%) sepia(44%) saturate(536%)
      hue-rotate(180deg) brightness(110%) contrast(96%);
    }
  }
`;

export default StyledFooter;
