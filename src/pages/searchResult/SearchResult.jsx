import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useParams } from "react-router-dom";
import { fetchDataFromApi } from "../../utils/api";
import "./style.scss"
import Spinner from "../../components/spinner/Spinner";
import MovieCard from "../../components/movieCard/MovieCard";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";




const SearchResult = () => {
    const [data, setData] = useState(null);
    const [pageNum, setPageNum] = useState(1);
    const [loading, setLoading] = useState(false);
    const { query } = useParams();

    const fetchInitialData = () => {
        setLoading(true)
        fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then((res) => {
            setData(res);
            setPageNum((prev) => prev + 1);
            setLoading(false);
        })
    }

    useEffect(() => {
        setPageNum(1);
        fetchInitialData();
    }, [query])


    const fetchNextPageData = () => {
        setLoading(true)
        fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then((res) => {
            if (data?.results) {
                setData({
                    ...data,
                    results: [...data?.results, ...res.results]
                })
            } else {
                setData(res)
            }
            setPageNum((prev) => prev + 1);
            setLoading(false);
        })
    }

    return (
        <div className="searchResultPage">
            {loading && <Spinner initial={true} />}
            {!loading && data && (
                <ContentWrapper>
                    {data?.results.length > 0 ? (
                        <>
                            <div className="pageTitle">
                                {`Search ${data?.total_results > 1 ? "results" : "result"} of '${query}'`}
                            </div>

                            <InfiniteScroll
                                className="content"
                                dataLength={data?.results.length || []}
                                next={fetchNextPageData}
                                hasMore={pageNum <= data?.total_pages}
                                loader={<Spinner />}
                            >
                                {data.results.map((item, index) => {
                                    if (item.media_type === "person") return;
                                    return (
                                        <MovieCard key={index} data={item} fromSearch={true} />
                                    )
                                })}
                            </InfiniteScroll>
                        </>
                    ) : (
                        <span className="resultNotFound">
                            Sorry,Results not Found!
                        </span>
                    )}
                </ContentWrapper>
            )
            }
        </div >
    );
}

export default SearchResult;
