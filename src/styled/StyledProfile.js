import styled from 'styled-components';

const StyledProfile = styled.div`
  &, .profile-links{
    align-items: center;
    display: flex;
    flex-direction: column;
  }

  .profile-links {
    gap: 30px;
    max-width: 300px;
    width: 80%;
  }

  .profile-links-button {
    background-color: ${({ theme }) => theme.recipeItems};
    border: unset;
    border-radius: 10px;
    box-shadow: 5px 5px 15px -5px rgba(0,0,0,0.27);
    color: ${({ theme }) => theme.dark};
    font-size: 1.2rem;
    font-weight: 700;
    padding: 1rem;
    width: 100%;
  }

  .profile-user {
    padding: 3rem 2rem;
    text-align: center;
  }

  .profile-user-email {
    font-size: 1.3rem;
    font-style: italic;
    font-weight: 800;
  }

  .profile-user-icon {
    margin-bottom: 1rem;
    width: 20%;
  }
`;

export default StyledProfile;
