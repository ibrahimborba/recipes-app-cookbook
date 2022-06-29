import styled from 'styled-components';

const StyledSearchBar = styled.form`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;

  label {
    color: ${(props) => props.theme.secondaryColor};
    font-weight: 600;
    font-size: 1rem;
  }  

  input[type=text] {
    height: 24px;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    border: none;
    border-bottom: 2px solid ${(props) => props.theme.secondaryColor};
    background: transparent;
    ::placeholder {
      color: ${(props) => props.theme.secondaryColor};
      font-style: italic;
      font-size: .8rem;
    }
    :focus {
      color: ${(props) => props.theme.secondaryColor};
    } 
  }  

  section {
    width: 85%;
    margin-bottom: 10px;
    display: flex;
    flex-direction: row row-reverse;
    justify-content: space-around;
    align-items: center;
  }

  button {
    width: 70%;
    padding: 10px;
    border: unset;
    border-radius: 10px;
    background-color: ${(props) => props.theme.dark};
    color: ${(props) => props.theme.mainColor};
    font-weight: 700;
    font-size: 1rem;
    box-shadow: 2px 2px 10px -2px rgba(0,0,0,0.27);
    transition: all 250ms;
    text-align: center;
    overflow: hidden;
    margin-bottom: 20px;
    }
`;

export default StyledSearchBar;
