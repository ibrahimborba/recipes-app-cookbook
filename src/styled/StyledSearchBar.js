import styled from 'styled-components';

const StyledSearchBar = styled.form`
  align-items: center;
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  margin-top: 10px;
  width: 100%;

  .search-input {
    width: 85%;
    display: flex;
    justify-content: space-around;
    align-items: center;

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

    label {
      width: 100%;
      max-width: 350px;

      input {
        width: 100%;
      }
    }
  }

  section {
    width: 85%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    max-width: 500px;
  }

  label {
    color: ${(props) => props.theme.secondaryColor};
    cursor: pointer;
    font-size: 1rem;
    font-weight: 600;
  }

  input[type=radio] {
    accent-color: ${(props) => props.theme.dark};
  }

  .btn_search {
    background-color: ${(props) => props.theme.dark};
    border: unset;
    border-radius: 10px;
    box-shadow: 2px 2px 10px -2px rgba(0,0,0,0.27);
    font-weight: 700;
    font-size: 1rem;
    margin-bottom: 20px;
    max-width: 300px;
    padding: 10px;
    text-align: center;
    width: 70%;
    
    &:hover {
      cursor: pointer;
    }
  }

  @media (min-width: 1000px) {
    .search-input {
      label {
        width: 50%;
        max-width: 425px;
  
        input {
          width: 100%;
        }
      }
    }
  }
`;

export default StyledSearchBar;
