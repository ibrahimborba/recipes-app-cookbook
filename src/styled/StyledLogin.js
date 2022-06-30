import styled from 'styled-components';
import bgCover from '../images/wine_background.png';

export const StyledLogin = styled.div`
  align-items:center;
  background-image: url(${bgCover});
  background-position: right;
  background-size: cover;
  display: flex;
  flex-direction:column;
  height: 100vh;
  justify-content: center;

  h1 {
    color: ${(props) => props.theme.mainColor};
    font-size: 2.5rem;
    font-weight: 600;
    margin-bottom: 20px;
    text-shadow: 6px 6px 7px rgba(0,0,0,0.8);
  }
`;

export const StyledCard = styled.div`
  backdrop-filter: blur(5px);
  background: rgba(74, 74, 74, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 16px;
  box-shadow: 0 5px 30px rgba(0, 0, 0, 0.4);
  padding: 16px;
  width: 80%;
  max-width: 350px;
  display: flex;
  justify-content: center;

  -webkit-backdrop-filter: blur(5px);

  form {
    align-items: center;
    display: flex;
    flex-direction: column;
    margin-top: 1rem;
    width: 90%;
  }

  input {
    background: transparent;
    border: none;
    border-bottom: 1px solid ${(props) => props.theme.mainColor};
    color: ${(props) => props.theme.mainColor};
    margin-top: .5rem;
    margin-bottom: 1.5rem;
    width: 100%;
    font-size: 1rem;

    ::placeholder {
      color: ${(props) => props.theme.lightgray};
      font-size: 0.9rem;
      font-style: italic;
      font-weight: 500;
    }

    :focus {
      color: ${(props) => props.theme.mainColor};
      outline: none;
    }
  }

  label {
    color: ${(props) => props.theme.mainColor};
    font-size: 1.2rem;
    font-weight: 700;
    max-width: 300px;
  }

  button {
    background-color: ${(props) => props.theme.dark};
    border: none;
    border-radius: 5px;
    color: ${(props) => props.theme.mainColor};
    font-size: 1rem;
    font-weight: 600;
    margin: 1rem 0;
    padding: .5rem 1rem;
    transition: 0.4s;
    width: 50%;
  }

  button:disabled {
    background-color: ${({ theme }) => theme.disabled};
    color: ${({ theme }) => theme.secondary};
    transition: 0.4s;
  }
`;
