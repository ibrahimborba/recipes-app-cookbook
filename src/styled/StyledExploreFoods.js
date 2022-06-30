import styled from 'styled-components';
import foodsImg from '../images/foods_ingredients.png';
import flagsImg from '../images/flags.png';
import questionImg from '../images/question_mark.png';

const StyledExploreFoods = styled.div`
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;


  button {
    color: ${(props) => props.theme.mainColor};
    height: 130px;
    border-radius: 13px;
    border: none;
    font-weight: 600;
    font-size: 1.2rem;
    margin-top: 2rem;
    max-width: 500px;
    width: 80%;
  }

  .food-ingredient-btn {
    background: linear-gradient(to right, rgb(0, 0, 0, 0.45),
    rgb(0, 0, 0, 0.45)), url(${foodsImg});
    background-size: cover;
  }

  .nationality-btn {
    background: linear-gradient(to right, rgb(0, 0, 0, 0.45),
    rgb(0, 0, 0, 0.45)), url(${flagsImg});
    background-size: cover;
  }

  .food-surprise-btn{
    background: linear-gradient(to right, rgb(0, 0, 0, 0.45),
    rgb(0, 0, 0, 0.45)), url(${questionImg});
    background-size: cover;
  }

`;

export default StyledExploreFoods;
