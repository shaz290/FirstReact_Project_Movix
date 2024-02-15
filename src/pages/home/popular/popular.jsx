import React, { useState } from 'react';
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper.jsx';
import SwitchTabs from '../../../components/switchTabs/SwitchTabs';
import useFetch from '../../../hooks/useFetch';
import Carousel from '../../../components/carousel/Carousel';
import "./style.scss"

const Popular = () => {
    const [endpoint, setEndpoint] = useState("movie");
    const { data, loading } = useFetch(`/${endpoint}/popular`);

    const onTabChange = (tab) => {
        setEndpoint(tab === "Movies" ? "movie" : "tv");
    };

    return (
        <ContentWrapper>
            <div className="trendingSection">
                <div className="trendingHeader">
                    <h2 className="sectionTitle">What's Popular</h2>
                    <SwitchTabs data={["Movies", "Tv Shows"]} onTabChange={onTabChange} />
                </div>
                <Carousel
                    data={data?.results} loading={loading} endpoint={endpoint} />
            </div>
        </ContentWrapper>
    );
};

export default Popular;
