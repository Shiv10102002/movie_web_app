import { useEffect, useState } from "react";
import { fetchDataFromApi } from "./utils/api";
import { useSelector, useDispatch } from "react-redux";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { getApiConfiguration, getGenres } from "./store/homeSliec";
import Header from "./components/headerSection/Header";
import Foter from "./components/footer/Foter";
import Home from "./pages/home/Home";

import Explore from "./pages/explore/Explore";
import PageNotFound from "./pages/404/PageNotFound";
import SearchResult from "./pages/search/SearchResult";
import Details from "./pages/details/Details";

function App() {
  const dispatch = useDispatch();
  const { url } = useSelector((state) => state.home);

  useEffect(() => {
    fetchApiConfig();
    genresCall();
  }, []);
  const fetchApiConfig = () => {
    fetchDataFromApi("/configuration").then((res) => {
      console.log(res);

      const url = {
        backdrop: res.images.secure_base_url + "original",
        poster: res.images.secure_base_url + "original",
        profile: res.images.secure_base_url + "original",
      };
      dispatch(getApiConfiguration(url));
    });
  };
  const genresCall = async () => {
    let promices = [];
    let endpoints = ["tv", "movie"];
    let allGenres = {};
    endpoints.forEach((url) => {
      promices.push(fetchDataFromApi(`/genre/${url}/list`));
    });
    const data = await Promise.all(promices);
    data.map(({ genres }) => {
      return genres.map((item) => (allGenres[item.id] = item));
    });
    console.log(allGenres);
    dispatch(getGenres(allGenres));
  };

  return (
    <BrowserRouter>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:mediaType/:id" element={<Details />} />
        <Route path="/search/:query" element={<SearchResult />} />
        <Route path="/explore/:mediaType" element={<Explore />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Foter></Foter>
    </BrowserRouter>
  );
}

export default App;
