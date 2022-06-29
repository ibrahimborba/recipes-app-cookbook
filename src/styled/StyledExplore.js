import styled from 'styled-components';
import mealImg from '../images/meal.png';
import drinkImg from '../images/drink.png';

const StyledExplore = styled.div`
  height: 100vh;
  background-color: ${(props) => props.theme.lightgray};
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;


  button {
    color: ${(props) => props.theme.mainColor};
    height: 30%;
    border-radius: 13px;
    border: none;
    font-weight: 600;
    font-size: 1.2rem;
    margin-top: 3rem;
    width: 80%;
  }

  .foods-btn{
    background: linear-gradient(to right, rgb(0, 0, 0, 0.45),
    rgb(0, 0, 0, 0.45)), url(${mealImg});
    background-size: cover;
  }

  .drinks-btn{
    background: linear-gradient(to right, rgb(0, 0, 0, 0.45),
    rgb(0, 0, 0, 0.45)), url(${drinkImg});
    background-size: cover;
  }
`;

export default StyledExplore;
