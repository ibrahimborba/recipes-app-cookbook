import styled from 'styled-components';

const StyledNationalities = styled.div`
  display: flex;
  justify-content: center;
  padding: 1rem 0 ;
  width: 100%;

  .select-nationalities {
    background-color: unset;
    border: none;
    border-bottom: 2px solid ${({ theme }) => theme.dark};
    font-size: 1.5rem;
    font-weight: 600;
    width: 310px;
  }

  .select-nationalities:focus {
    background-color: ${({ theme }) => theme.lightgray};
    outline: none;
  }
`;

export default StyledNationalities;
