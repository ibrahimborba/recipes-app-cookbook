import styled from 'styled-components';

const StyledRecipeTitle = styled.div`
  margin-bottom: 2rem;
  width: 100%;

  .bar-button {
    background: #ffffff;
    box-shadow: 5px 5px 7px #d9d9d9, -5px -5px 7px #ffffff;
    border: none;
    border-radius: 6px;
    margin-left: 10px;
    width: 40px;

    &:active {
      background-color: whitesmoke;
      -webkit-tap-highlight-color: transparent;
    }

    &:hover {
      cursor: pointer;
    }
  }

  .icon {
    width: 26px;
    height: 100%;
  }

  .recipe-bar, .recipe-bar-buttons-container {
    align-items: center;
    display: flex;
  }

  .recipe-bar {
    justify-content: space-between;
    margin-bottom: .3rem;
  }
  
  .recipe-bar-title {
    font-size: 1.8rem;
    font-weight: 900;
    max-width: 180px;
  }

  .recipe-bar-buttons-container {
    position: relative;

    span {
      font-size: 0.8rem;
      left: -7%;
      top: 120%;
      position: absolute;
      z-index: 2;
    }
  }

  .recipe-category {
    color: ${(props) => props.theme.typography.secondary};
    font-size: 1.3rem;
    font-weight: 600;
  }
`;

export default StyledRecipeTitle;
