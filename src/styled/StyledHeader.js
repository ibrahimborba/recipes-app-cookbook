import styled from 'styled-components';

const StyledHeader = styled.header`
  box-shadow: 2px 2px 10px -2px rgba(0,0,0,0.27);

  section {
    width: 100%;
    height: 60px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
  }

  h1 {
    font-size: 1.5rem;
    font-weight: 700;
  }

  button {
    width: 100px;
    padding: 10px;
    border: unset;
    background-color: transparent;
    color: ${(props) => props.theme.secondaryColor};
    transition: all 250ms;
    text-align: center;
    }
`;

export default StyledHeader;
