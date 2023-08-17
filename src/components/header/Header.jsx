import './header.scss';
import logo from '../../images/ico.png';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SearchOutlined } from '@ant-design/icons';
import SearchResults from '../../pages/SearchResults'; // Import the SearchResults component

const dataNav = [
  {
    title: 'Home',
    path: '/'
  },
  {
    title: 'Movies',
    path: '/movie'
  },
  {
    title: 'TV Series',
    path: '/tv'
  },
  {
    title: 'Search',
    path: '/search-results'
  }
];

const Header = () => {
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [searchText, setSearchText] = useState('');

  const { pathname } = useLocation();
  const active = dataNav.findIndex(e => e.path === pathname);

  useEffect(() => {
    const shrinkHeader = () => {
      const headerElement = document.querySelector('.header');
      if (headerElement) {
        if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
          headerElement.classList.add('shrink');
        } else {
          headerElement.classList.remove('shrink');
        }
      }
    };
    window.addEventListener('scroll', shrinkHeader);
    return () => {
      window.removeEventListener('scroll', shrinkHeader);
    };
  }, []);

  const handleSearchIconClick = () => {
    setShowSearchInput(true);
  };

  const handleSearchInputChange = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <div className="header">
      <div className="header__wrap container">
        <div className="logo">
          <img src={logo} alt="MovieHubX" />
          <Link to="/">MovieHubX</Link>
        </div>
        <ul className="header__nav">
          {dataNav.map((e, i) => (
            <li key={i} className={`${i === active ? 'active' : ''}`}>
              {e.title === 'Search' ? (
                showSearchInput ? (
                  <form onSubmit={(e) => e.preventDefault()}>
                    <input
                      type="text"
                      placeholder="Search..."
                      value={searchText}
                      onChange={handleSearchInputChange}
                    />
                  </form>
                ) : (
                  <SearchOutlined onClick={handleSearchIconClick} />
                )
              ) : (
                <Link to={e.path}>{e.title}</Link>
              )}
            </li>
          ))}
        </ul>
      </div>
      {searchText && <SearchResults searchText={searchText} />}
    </div>
  );
};

export default Header;
