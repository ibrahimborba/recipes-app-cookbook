import styled from 'styled-components';

const StyledHeader = styled.header`
  box-shadow: 2px 2px 10px -2px rgba(0,0,0,0.27);
  color: ${(props) => props.theme.secondaryColor};

  section {
    height: 60px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    position: relative;
  }

  h1 {
    font-size: 1.5rem;
    font-weight: 700;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    line-height: 1.6rem;
    text-align: center;
  }

  button {
    margin: 10px;
    border: unset;
    background-color: transparent;
    color: ${(props) => props.theme.mainColor};
    text-align: center;
  }
`;

export default StyledHeader;
