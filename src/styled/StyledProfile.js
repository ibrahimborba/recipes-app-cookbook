import styled from 'styled-components';

const StyledProfile = styled.div`
  &, .profile-links{
    align-items: center;
    display: flex;
    flex-direction: column;
  }

  .profile-container {
    align-items: center;
    display: flex;
    flex-flow: column wrap;
    justify-content: center;
  }

  .profile-email {
    font-size: 1.3rem;
    font-weight: 800;
    margin: 25% 0;
  }

  .profile-links {
    gap: 30px;
    width: 80%;
  }

  .profile-links-button {
    background-color: ${(props) => props.theme.dark};
    border-radius: 13px;
    border: none;
    color: ${(props) => props.theme.mainColor};
    font-size: 1.2rem;
    font-weight: 600;
    border-radius: 10px;
    box-shadow: 2px 2px 10px -2px rgba(0,0,0,0.27);
    padding: 1rem;
    width: 100%;
  }
`;

export default StyledProfile;
