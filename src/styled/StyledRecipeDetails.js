import styled from 'styled-components';

const StyledRecipeDetails = styled.div`
  .checked {
    text-decoration: line-through;
  }

  .ingredient-checkbox {
    accent-color: ${({ theme }) => theme.dark};
  }

  .recipe-details {
    background: ${(props) => props.theme.lightgray};
    border-radius: 20px;
    box-shadow:  15px 15px 35px #b3b3b3, -15px -15px 35px #ffffff;
    margin-bottom: 2rem;
    padding: 20px;
  }

  .recipe-details-ingredient {
    margin-bottom: .3rem;
  }

  .recipe-details-ingredient, .recipe-details-instructions {
    color: ${(props) => props.theme.typography.secondary};
    font-weight: 600;
    line-height: 1.5rem;
  }

  .recipe-details-instructions {
    text-align: justify;
    text-indent: 2rem;
    white-space: pre-line;
  }

  .recipe-details-title {
    font-size: 1.6rem;
    font-weight: 800;
    margin-bottom: .5rem;
  }
`;

export default StyledRecipeDetails;
