import './header.scss';
import logo from '../../images/ico.png';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SearchOutlined } from '@ant-design/icons';
import Search from '../../pages/Search'; // Import the Search component

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
        title: 'Search', // Keep the title as 'Search'
        path: '/search'
    }
];

const Header = () => {
    const [showSearch, setShowSearch] = useState(false);

    const { pathname } = useLocation();
    const active = dataNav.findIndex(e => e.path === pathname);

    useEffect(() => {
        const shrinkHeader = () => {
            if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
                document.querySelector('.header').classList.add('shrink');
            } else {
                document.querySelector('.header').classList.remove('shrink');
            }
        }
        window.addEventListener('scroll', shrinkHeader);
        return () => {
            window.removeEventListener('scroll', shrinkHeader);
        };
    }, []);

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
                            <Link to={e.path}>
                                {e.title === 'Search' ? <SearchOutlined /> : e.title}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
            {showSearch && <Search />}
        </div>
    );
}

export default Header;
