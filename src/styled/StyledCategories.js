import styled from 'styled-components';

const StyledCategories = styled.section`
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(auto-fit, 100px);
  justify-content: center;
  justify-items: center;
  padding: 20px;

  button {
    width: 100px;
    padding: 10px;
    border: unset;
    border-radius: 10px;
    background-color: ${(props) => props.theme.lightgray};
    color: ${(props) => props.theme.secondaryColor};
    font-weight: 700;
    font-size: 1rem;
    box-shadow: 2px 2px 10px -2px rgba(0,0,0,0.27);
    transition: all 250ms;
    text-align: center;
    overflow: hidden;
    }

  .selectedCategory {
    background-color: ${(props) => props.theme.dark};
    color: ${(props) => props.theme.mainColor};
  }

`;

export default StyledCategories;
