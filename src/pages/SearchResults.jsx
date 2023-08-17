import React from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import Pagination from './Pagination';
import { img_300, unavailable } from './Images';

const fetchSearchResults = async (searchText, page) => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/search/multi`,
    {
      params: {
        api_key: '3d820eab8fd533d2fd7e1514e86292ea',
        language: 'en-US',
        query: searchText,
        page: page,
        include_adult: false,
      },
    }
  );
  return response.data.results;
};

const SearchResults = ({ searchText }) => {
  const { data: content, isLoading, isError } = useQuery(
    ['searchResults', searchText],
    () => fetchSearchResults(searchText, 1),
    { keepPreviousData: true }
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

  return (
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
                  alt={title || name}
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
        <Pagination searchText={searchText} />
      </div>
    </div>
  );
};

export default SearchResults;
