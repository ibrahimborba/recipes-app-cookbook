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
      .map((word) => {
        const string = word
          .replace('-', ' ')
          .split(' ')
          .reduce((acc, txt) => {
            acc += `${txt.charAt(0).toUpperCase()}${txt.substring(1).toLowerCase()} `;

            return acc;
          }, '');

        return string;
      });

    if (text.length === 1) setTitle(`${text[0]}`);
    else setTitle(`${text[0]}${text[text.length - 1]}`);
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
