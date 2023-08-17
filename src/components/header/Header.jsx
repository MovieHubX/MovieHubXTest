import './header.scss';
import logo from '../../images/ico.png';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SearchOutlined } from '@ant-design/icons';
import Pagination from '../../pages/Pagination'; // Import Pagination
import { img_300, unavailable } from '../../pages/Images'; // Import image constants

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
    const [searchText, setSearchText] = useState("");
    const [page, setPage] = useState(1); // State for pagination
    const [content, setContent] = useState([]); // State for search results

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

    const fetchSearch = async () => {
        const data = await fetch(
            `https://api.themoviedb.org/3/search/multi?api_key=3d820eab8fd533d2fd7e1514e86292ea&language=en-US&query=${searchText}&page=${page}&include_adult=false`
        );
        const { results } = await data.json();
        setContent(results);
    };

    useEffect(() => {
        if (showSearch) {
            fetchSearch();
        }
    }, [page, showSearch]);

    const handleSearchIconClick = () => {
        if (showSearch) {
            setShowSearch(false);
            setPage(1);
        } else {
            setShowSearch(true);
        }
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
                                <SearchOutlined onClick={handleSearchIconClick} />
                            ) : (
                                <Link to={e.path}>{e.title}</Link>
                            )}
                        </li>
                    ))}
                </ul>
                {showSearch && (
                    <div className="header__search">
                        <input
                            type="text"
                            placeholder="Search..."
                            onChange={handleSearchInputChange}
                        />
                    </div>
                )}
            </div>
            {showSearch && (
                <div className="container">
                    <div className="row pt-3 mb-5 pb-5">
                        {/* Render search results */}
                        {content.map((Val) => {
                            const {
                                name,
                                title,
                                poster_path,
                                first_air_date,
                                release_date,
                                media_type,
                                id,
                            } = Val;
                            return (
                                <div className="col-md-3 col-sm-4 py-3" id="card" key={id}>
                                    <div className="card bg-dark" key={id}>
                                        <img
                                            src={
                                                poster_path
                                                    ? `${img_300}/${poster_path}`
                                                    : unavailable
                                            }
                                            className="card-img-top pt-3 pb-0 px-3"
                                        />
                                        <div className="card-body">
                                            <h5 className="card-title text-center fs-5">
                                                {title || name}
                                            </h5>
                                            <div className="d-flex fs-6 align-items-center justify-content-evenly movie">
                                                <div>{media_type === 'tv' ? 'TV' : 'Movie'}</div>
                                                <div>{first_air_date || release_date}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                        {page > 1 && <Pagination page={page} setPage={setPage} />}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Header;
