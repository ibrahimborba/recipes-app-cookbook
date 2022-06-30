import styled from 'styled-components';
import questionImg from '../images/question_mark.png';
import drinksImg from '../images/drinks_ingredient.png';

const StyledExploreDrinks = styled.div`
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;


  button {
    color: ${(props) => props.theme.mainColor};
    height: 200px;
    border-radius: 13px;
    border: none;
    font-weight: 600;
    font-size: 1.2rem;
    margin-top: 2rem;
    width: 80%;
  }

  .ingredient-btn {
    background: linear-gradient(to right, rgb(0, 0, 0, 0.45),
    rgb(0, 0, 0, 0.45)), url(${drinksImg});
    background-size: cover;
  }

  .surprise-btn {
    background: linear-gradient(to right, rgb(0, 0, 0, 0.45),
    rgb(0, 0, 0, 0.45)), url(${questionImg});
    background-size: cover;
  }

`;

export default StyledExploreDrinks;
