import styled from 'styled-components';

const StyledRecipe = styled.div`
  height: 100%;
  width: 100%;
  margin-bottom: 5rem;

  section {
    width: 100%;
    padding: 1rem;
  }

  img {
    width: 100%;
    height: 180px;
    object-fit: cover;
    object-position: 0% 30%; 
  }

  iframe {
    border: none;
    border-radius: 20px;
    box-shadow:  15px 15px 35px #b3b3b3, -15px -15px 35px #ffffff;
    margin-bottom: 3rem;
    width: 100%;
  }
`;

export default StyledRecipe;
