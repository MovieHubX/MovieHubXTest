// src/pages/Search.js

import React, { useState, useEffect } from "react";
import Pagination from "./Pagination";
import { img_300, unavailable } from "./Images";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const Search = () => {
  // ... (Your existing code)

  return (
    <>
      <div className="container">
        <div className="row pt-3 mb-5 pb-5">
          {/* ... (Your existing code) */}
          {content &&
            content.map((Val) => {
              const {
                // ... (Your existing code)

              return (
                <Link
                  to={`/${media_type}/${id}/watch`} // Link to MovieWatch page
                  key={id}
                  className="col-md-3 col-sm-4 py-3"
                >
                  <div className="card bg-dark">
                    {/* ... (Your existing code) */}
                  </div>
                </Link>
              );
            })}
          {/* ... (Your existing code) */}
        </div>
      </div>
    </>
  );
};

export default Search;
