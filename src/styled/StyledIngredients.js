import styled from 'styled-components';

const StyledIngredients = styled.div`
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(auto-fit, 150px);
  justify-content: center;
  justify-items: center;
  color: ${(props) => props.theme.secondaryColor};
  margin: 20px 0 70px 0;

  button {
    background-color: transparent;
    border: none;
    margin-bottom: 10px;
  }

  p {
    font-weight: 700;
    font-size: 1rem;
  }
`;

export default StyledIngredients;
