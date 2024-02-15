import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useFetch from '../../../hooks/useFetch';
import './style.scss';
import Img from "../../../components/lazyLoadImage/Img";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper.jsx";

const HeroBanner = () => {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();
    const [background, setBackground] = useState('');

    const { url } = useSelector((state) => state.home);

    const { data, loading, error } = useFetch('/movie/upcoming');

    useEffect(() => {
        if (!loading && !error && data && data.results && data.results.length > 0) {
            const randomIndex = Math.floor(Math.random() * data.results.length);
            const bg = url.backdrop + data.results[randomIndex].backdrop_path;
            setBackground(bg);
        }
    }, [data, error, loading, url]);

    const searchQueryHandler = (event) => {
        if (event.key === 'Enter' && query.trim().length > 0) {
            navigate(`/search/${query.trim()}`);
        }
    };

    const handleInputChange = (e) => {
        setQuery(e.target.value);
    };

    const handleSearch = () => {
        if (query.trim().length > 0) {
            navigate(`/search/${query.trim()}`);
        }
    };

    return (
        <div className="heroBanner">
            {!loading && <div className="backdrop-img">
                <Img src={background} />
            </div>}


            <div className="opacity-layer"> </div>
            <ContentWrapper>
                <div className="heroBannerContent">
                    <h1 className="title">Welcome</h1>
                    <p className="subTitle">Discover millions of TV shows and movies</p>
                    <div className="searchInput">
                        <input
                            type="text"
                            placeholder="Search for a movie or TV show..."
                            value={query}
                            onChange={handleInputChange}
                            onKeyUp={searchQueryHandler}
                        />
                        <button onClick={handleSearch}>Search</button>
                    </div>
                </div>
            </ContentWrapper>

        </div>
    );
};

export default HeroBanner;
