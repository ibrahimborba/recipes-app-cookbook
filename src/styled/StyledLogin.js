import styled from 'styled-components';
import wineImg from '../images/wine_background.png';

export const StyledLogin = styled.div`
  height: 100vh;
  display: flex;
  align-items:center;
  flex-direction:column;
  background-image: url(${wineImg});
  background-size: cover;
  background-position: right;

  h1 {
    margin-top: 55%;
    margin-bottom: 20px;
    font-size: 2.5rem;
    color: ${(props) => props.theme.mainColor};
    font-weight: 600;
  }
`;

export const StyledCard = styled.div`
  padding: 16px;
  background: rgba(74, 74, 74, 0.25);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.18);

  input {
    margin-top: 3px;
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    border: none;
    border-bottom: 1px solid ${(props) => props.theme.mainColor};
    background: transparent;
    ::placeholder {
      color: ${(props) => props.theme.mainColor};
      font-style: italic;
      font-size: 0.65rem;
    }
    :focus {
      color: ${(props) => props.theme.mainColor};
    }
  }

  label {
    color: ${(props) => props.theme.mainColor};
    font-weight: 600;
    font-size: 0.8rem;
  }

  button {
    margin: 0 auto;
    height: 1rem;
    background-color: ${(props) => props.theme.secondaryColor};
    color: ${(props) => props.theme.mainColor};
    padding: 10px;
    border-radius: 5px;
    font-weight: 600;
    font-size: 0.8rem;
    display: flex;
    align-items: center;
  }
`;
