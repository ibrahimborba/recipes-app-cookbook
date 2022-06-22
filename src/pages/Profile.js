import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getUser, logout } from '../services/userLocalSt';

function Profile() {
  const history = useHistory();

  const handleLogout = () => {
    logout();
    history.push('/');
  };
  const userEmail = getUser();

  return (
    <>
      <Header />
      <h2 data-testid="profile-email">{ userEmail.email }</h2>
      <button
        type="button"
        data-testid="profile-done-btn"
        onClick={ () => history.push('/done-recipes') }
      >
        Done Recipes
      </button>
      <button
        type="button"
        data-testid="profile-favorite-btn"
        onClick={ () => history.push('/favorite-recipes') }
      >
        Favorite Recipes
      </button>
      <button
        type="button"
        data-testid="profile-logout-btn"
        onClick={ handleLogout }
      >
        Logout
      </button>
      <Footer />
    </>
  );
}

export default Profile;
