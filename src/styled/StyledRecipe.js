import styled from 'styled-components';

const StyledRecipe = styled.div`
  height: 100vh;
  width: 100vw;

  section {
    width: 100%;
    padding: 0.8rem;
  }

  img {
    width: 100%;
    height: 180px;
    object-fit: cover;
    object-position: 0% 30%; 
  }
`;

export default StyledRecipe;
