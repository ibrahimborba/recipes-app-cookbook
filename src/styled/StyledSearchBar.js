import styled from 'styled-components';

const StyledSearchBar = styled.form`
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  font-size: 14px;

  button {
    width: 100px;
    padding: 10px;
    border: unset;
    border-radius: 10px;
    background-color: ${(props) => props.theme.lightgray};
    color: ${(props) => props.theme.secondaryColor};
    font-weight: 700;
    font-size: 1rem;
    box-shadow: 2px 2px 10px -2px rgba(0,0,0,0.27);
    transition: all 250ms;
    text-align: center;
    overflow: hidden;
    }

  button:hover {
    background-color: ${(props) => props.theme.dark};
    color: ${(props) => props.theme.mainColor};
    cursor: pointer;
  }
`;

export default StyledSearchBar;
