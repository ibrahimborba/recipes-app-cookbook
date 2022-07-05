import styled from 'styled-components';

const StyledCategories = styled.section`
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(auto-fit, 100px);
  justify-content: center;
  justify-items: center;
  padding: 20px;

  button {
    background-color: ${(props) => props.theme.lightgray};
    border: unset;
    border-radius: 10px;
    box-shadow: 2px 2px 10px -2px rgba(0,0,0,0.27);
    color: ${(props) => props.theme.secondaryColor};
    font-size: 1rem;
    font-weight: 700;
    padding: 10px;
    overflow: hidden;
    text-align: center;
    transition: all 250ms;
    width: 100px;
    
    &:hover {
      cursor: pointer;
    }
  }

  .selectedCategory {
    background-color: ${(props) => props.theme.dark};
    color: ${(props) => props.theme.mainColor};
  }

`;

export default StyledCategories;
