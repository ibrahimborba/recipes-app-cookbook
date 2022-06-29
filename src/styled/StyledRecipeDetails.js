import styled from 'styled-components';

const StyledRecipeDetails = styled.div`
  div {
    background: ${(props) => props.theme.recipeItems};
    border-radius: 20px;
    box-shadow:  15px 15px 35px #b3b3b3, -15px -15px 35px #ffffff;
    margin-bottom: 2rem;
    padding: 20px;

    div {
      background: none;
      border-radius: none;
      box-shadow:  none;
      margin-bottom: 0;
      padding: 0;
    }

    h3 {
      font-size: 1.6rem;
      font-weight: 800;
      margin-bottom: .5rem;
    }

    p {
      text-align: justify;
      text-indent: 2rem;
      white-space: pre-line;
    }

    li, p {
      color: ${(props) => props.theme.typography.secondary};
      font-weight: 800;
      line-height: 1.5rem;
    }
  
    ul {
      li {
        margin-bottom: .3rem;
      }
    }
  }
`;

export default StyledRecipeDetails;
