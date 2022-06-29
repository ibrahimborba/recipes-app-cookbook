import styled from 'styled-components';

const StyledExploreFoods = styled.div`
  height: 100vh;
  background-color: ${(props) => props.theme.lightgray};
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;


  button {
    color: ${(props) => props.theme.mainColor};
    height: 20%;
    border-radius: 13px;
    border: none;
    font-weight: 600;
    font-size: 1.2rem;
    margin-top: 2rem;
    width: 80%;
  }

  .food-ingredient-btn {
    background: linear-gradient(to right, rgb(0, 0, 0, 0.45),
    rgb(0, 0, 0, 0.45)), url("./foods_ingredients.jpg");
    background-size: cover;
  }

  .nationality-btn {
    background: linear-gradient(to right, rgb(0, 0, 0, 0.45),
    rgb(0, 0, 0, 0.45)), url("./flags.jpg");
    background-size: cover;
  }

  .food-surprise-btn{
    background: linear-gradient(to right, rgb(0, 0, 0, 0.45),
    rgb(0, 0, 0, 0.45)), url("./question_mark.jpg");
    background-size: cover;
  }

`;

export default StyledExploreFoods;
