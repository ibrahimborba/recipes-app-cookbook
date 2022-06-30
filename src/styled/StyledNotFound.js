import styled from 'styled-components';
import background from '../images/background_notfound.png';

const StyledNotFound = styled.div`
  background-image: url(${background});
  background-size: cover;
  background-position: center;

  section {
    color: ${(props) => props.theme.secondaryColor};
    margin: 0 auto;
    width: 60%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding-top: 70px;

    h1 {
      font-size: 1.5rem;
      font-weight: 700;
      margin-bottom: 20px;
    }
  
    h2 {
      font-weight: 600;
      margin-bottom: 20px;
      font-size: 1rem;
    }

    h3 {
      font-weight: 500;
      margin-bottom: 20px;
      font-size: 1rem;
    }
  
    a {
      width: 100%;
      padding-bottom: 2px;
      border-bottom: 3px solid ${(props) => props.theme.secondaryColor};
      color: ${(props) => props.theme.secondaryColor};
      font-weight: 700;
      text-decoration: none;
    }
  }
`;

export default StyledNotFound;
