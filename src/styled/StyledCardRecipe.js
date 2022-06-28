import styled from 'styled-components';

const StyledCardRecipe = styled.div`
  background: linear-gradient(
    to bottom, rgba(20,20,20,0) 50%,rgba(20,20,20,5) 100%
  );
  color: ${(props) => props.theme.mainColor};
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  position: relative;
  border-radius: 10px;

  img {
    border-radius: 10px;
    z-index: -1;
  }

  h3 {
    font-size: 1.25rem;
    font-weight: 700;
    position: absolute;
    bottom: 5%;
    left: 5%;
    text-shadow : 1px 1px 5px ${(props) => props.theme.secondaryColor};
  }
`;

export default StyledCardRecipe;
