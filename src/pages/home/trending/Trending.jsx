import React, { useState } from 'react';
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';
import SwitchTabs from '../../../components/switchTabs/SwitchTabs';
import useFetch from '../../../hooks/useFetch';
import Carousel from '../../../components/carousel/Carousel';
import "./style.scss"

const Trending = () => {
    const [endpoint, setEndpoint] = useState("day");
    const { data, loading } = useFetch(`/trending/all/${endpoint}`);

    const onTabChange = (tab) => {
        setEndpoint(tab === "Day" ? "day" : "week");
    };

    return (
        <ContentWrapper>
            <div className="trendingSection">
                <div className="trendingHeader">
                    <h2 className="sectionTitle">Trending</h2>
                    <SwitchTabs data={["Day", "Week"]} onTabChange={onTabChange} />
                </div>
                <Carousel data={data?.results} loading={loading} />
            </div>
        </ContentWrapper>
    );
};

export default Trending;
