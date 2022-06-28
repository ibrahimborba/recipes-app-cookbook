import styled from 'styled-components';

const StyledCardRecipe = styled.div`
  background-color: ${(props) => props.theme.dark};
  color: ${(props) => props.theme.mainColor};
  width: 100%;
  height: 60px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
`;

export default StyledCardRecipe;
