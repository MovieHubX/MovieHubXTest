// src/pages/MovieWatch.jsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import apiType from '../api/apiType';
import apiConfig from '../api/apiConfig';
import './detail.scss';
import Movies from '../components/movies/Movies';

const MovieWatch = () => {
    // ... (Your existing code)

    return (
        <>
            {data && (
                <div className="video">
                    <iframe
                        className='video__watch'
                        src={`${category==='movie' ? apiConfig.embedMovie(data.id) : apiConfig.embedTV(data.id,data.seasons[0].season_number,data.seasons[0].episode_count)}`}
                        frameBorder="0"
                        allowFullScreen>
                    </iframe>
                    <div className='video__info'>
                        {/* ... (Your existing code) */}
                    </div>
                    <div className='similar'>
                        <div className=''>
                            <h1 className='mb-1'>Similar</h1>
                            <Movies category={category} type='similar' id={data.id} />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default MovieWatch;
