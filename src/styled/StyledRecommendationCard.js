import styled from 'styled-components';

const StyledRecommendationCard = styled.div`
  background: linear-gradient(to bottom, rgba(20,20,20,0) 50%,rgba(20,20,20,5) 100%);
  color: ${(props) => props.theme.mainColor};
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  border-radius: 10px;
  box-sizing: border-box;
  flex: none;
  margin: 0 5%;
  width: 40%;

  img {
    border-radius: 10px;
    z-index: -1;
  }

  h4 {
    position: absolute;
    bottom: 18%;
    left: 5%;
    font-size: 1.25rem;
    font-weight: 700;
    text-shadow : 1px 1px 5px ${(props) => props.theme.secondaryColor};
  }

  p {
    position: absolute;
    bottom: 5%;
    left: 5%;
    font-size: 0.8rem;
    text-shadow : 1px 1px 5px ${(props) => props.theme.secondaryColor};
  }
`;

export default StyledRecommendationCard;
