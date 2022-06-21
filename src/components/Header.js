import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useRouteMatch } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header({ enableSearch }) {
  const history = useHistory();
  const { path } = useRouteMatch();

  const [title, setTitle] = useState('');

  const formatTitle = useCallback(() => {
    const text = path
      .split('/')
      .slice(1)
      .reduce((acc, value, index, array) => {
        if (index === 0 || index === array.length - 1) {
          const string = value
            .replace('-', ' ')
            .split(' ')
            .reduce((acct, txt) => {
              acct += `${txt.charAt(0).toUpperCase()}${txt.substring(1).toLowerCase()} `;

              return acct;
            }, '');

          acc += string;
        }

        return acc;
      }, '')
      .trim();

    setTitle(text);
  }, [path]);

  useEffect(() => {
    formatTitle();
  }, [formatTitle]);

  return (
    <header>
      <button
        type="button"
        onClick={ () => history.push('/profile') }
      >
        <img data-testid="profile-top-btn" src={ profileIcon } alt="profile icon" />
      </button>
      <h1 data-testid="page-title">{ title }</h1>
      {
        enableSearch
        && (
          <button
            type="button"
          >
            <img data-testid="search-top-btn" src={ searchIcon } alt="profile icon" />
          </button>
        )
      }
    </header>
  );
}

Header.propTypes = {
  enableSearch: PropTypes.bool,
};

Header.defaultProps = {
  enableSearch: false,
};

export default Header;
