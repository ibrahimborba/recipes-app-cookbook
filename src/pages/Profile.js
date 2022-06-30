import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getUser, logout } from '../services/userLocalSt';
import StyledProfile from '../styled/StyledProfile';
import userIcon from '../images/user.png';

function Profile() {
  const [userEmail, setUserEmail] = useState({});
  const history = useHistory();

  const handleLogout = () => {
    logout();
    history.push('/');
  };

  useEffect(() => {
    setUserEmail(getUser());
  }, []);

  return (
    <>
      <Header />
      <StyledProfile>
        <div className="profile-user">
          <img className="profile-user-icon" src={ userIcon } alt="user" />
          <h2
            data-testid="profile-email"
            className="profile-user-email"
          >
            { userEmail.email }
          </h2>
        </div>
        <div className="profile-links">
          <button
            className="profile-links-button"
            type="button"
            data-testid="profile-done-btn"
            onClick={ () => history.push('/done-recipes') }
          >
            Done Recipes
          </button>
          <button
            className="profile-links-button"
            type="button"
            data-testid="profile-favorite-btn"
            onClick={ () => history.push('/favorite-recipes') }
          >
            Favorite Recipes
          </button>
          <button
            className="profile-links-button"
            type="button"
            data-testid="profile-logout-btn"
            onClick={ handleLogout }
          >
            Logout
          </button>
        </div>
      </StyledProfile>
      <Footer />
    </>
  );
}

export default Profile;
