import './header.scss';
import logo from '../../images/ico.png';
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
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
    path: '/search'
  }
];

const Header = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchText, setSearchText] = useState('');
  const history = useHistory(); // Use history for navigation

  const { pathname } = useLocation();
  const active = dataNav.findIndex(e => e.path === pathname);

  useEffect(() => {
    const shrinkHeader = () => {
      if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        document.querySelector('.header').classList.add('shrink');
      } else {
        document.querySelector('.header').classList.remove('shrink');
      }
    };
    window.addEventListener('scroll', shrinkHeader);
    return () => {
      window.removeEventListener('scroll', shrinkHeader);
    };
  }, []);

  const handleSearchIconClick = () => {
    if (showSearch) {
      setShowSearch(false);
      setSearchText('');
    } else {
      setShowSearch(true);
    }
  };

  const handleSearchInputChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    history.push(`/search?query=${searchText}`); // Navigate to search results page
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
                <SearchOutlined onClick={handleSearchIconClick} />
              ) : (
                <Link to={e.path}>{e.title}</Link>
              )}
            </li>
          ))}
        </ul>
        {showSearch && (
          <div className="header__search">
            <form onSubmit={handleSearchSubmit}>
              <input
                type="text"
                placeholder="Search..."
                value={searchText}
                onChange={handleSearchInputChange}
              />
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
