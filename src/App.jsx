import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { fetchDataFromApi } from "./utils/api.js";
import { useSelector, useDispatch } from 'react-redux';
import { getApiConfiguration, getGenres } from './store/homeSlice.js';

import Header from "./components/header/Header.jsx";
import Footer from "./components/footer/Footer.jsx";
import Home from "./pages/home/Home.jsx";
import Details from "./pages/details/Details.jsx";
import SearchResult from "./pages/searchResult/SearchResult.jsx";
import Explore from "./pages/explore/Explore.jsx";
import PageNotFound from "./pages/404/PageNotFound.jsx";

function App() {
  const dispatch = useDispatch();
  const { url } = useSelector((state) => state.home);
  console.log(url);

  useEffect(() => {
    fetchApiConfig();
    genresCall(dispatch); // Pass dispatch function as an argument
  }, []);

  const fetchApiConfig = () => {
    fetchDataFromApi('/configuration')
      .then((res) => {
        console.log(res);

        const url = {
          backdrop: res.images.secure_base_url + "original",
          poster: res.images.secure_base_url + "original",
          propfile: res.images.secure_base_url + "original",

        }

        dispatch(getApiConfiguration(url));
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:mediaType/:id" element={<Details />} />
        <Route path="/search/:query" element={<SearchResult />} />
        <Route path="/explore/:mediaType" element={<Explore />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

const genresCall = async (dispatch) => {
  let promises = []
  let endPoints = ["tv", "movie"]

  let allGenres = {}
  endPoints.forEach((url) => {
    promises.push(fetchDataFromApi(`/genre/${url}/list`))
  });

  const data = await Promise.all(promises);
  console.log(data);
  data.map(({ genres }) => {
    return genres.map((item) => (allGenres[item.id] = item))
  });

  dispatch(getGenres(allGenres));

};

export default App;
