import styled from 'styled-components';

const StyledCardRecipe = styled.div`
  background: linear-gradient(to bottom, rgba(20,20,20,0) 50%,rgba(20,20,20,5) 100%);
  color: ${(props) => props.theme.mainColor};
  height: 150px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;

  img {
    z-index: -1;
    border-radius: 10px;
  }

  h3 {
    width: 90%;
    position: absolute;
    bottom: 5%;
    left: 5%;
    font-size: 1.25rem;
    font-weight: 700;
    text-shadow : 1px 1px 5px ${(props) => props.theme.secondaryColor};
  }
`;

export default StyledCardRecipe;
