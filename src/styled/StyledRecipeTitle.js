import styled from 'styled-components';

const StyledRecipeTitle = styled.div`
  margin-bottom: 1rem;
  width: 100%;

  h2 {
    font-size: 1.8rem;
    font-weight: 400;
  }

  div {
    align-items: center;
    display: flex;
    justify-content: space-between;
    margin-bottom: .3rem;

    div {
      margin: 0;
    }

    div button {
      background: #ffffff;
      box-shadow: 5px 5px 7px #d9d9d9, -5px -5px 7px #ffffff;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      margin-left: .5rem;

      &:active {
        background-color: whitesmoke;
        -webkit-tap-highlight-color: transparent;
      }
    }

    div button img {
      width: 26px;
      height: 100%;
    }
  }

  p {
    color: ${(props) => props.theme.typography.secondary};
    font-size: 1.3rem;
  }
`;

export default StyledRecipeTitle;
