import styled from 'styled-components';

const StyledRecommended = styled.div`
  .recommendations-title {
    font-size: 1.6rem;
    font-weight: 800;
    margin-bottom: .5rem;
  }

  .recommendations-cards-container {
    display: flex;
    overflow-x: scroll;
    width: 100%;
    padding-bottom: 1rem;
  }
`;

export default StyledRecommended;
