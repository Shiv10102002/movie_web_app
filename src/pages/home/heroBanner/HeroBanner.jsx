import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.scss";
import useFetch from "../../../hooks/useFetch";
import { useEffect } from "react";
import { useSelector } from "react-redux";

import ContentWrapper from "../../../components/contwrap/ContetnWrapper";
import Img from "../../../components/lazyLoadingimg/Img";
const HeroBanner = () => {
  const navigate = useNavigate();
  const { url } = useSelector((state) => state.home);
  const [background, setbackground] = useState("");
  const [query, setquery] = useState("");
  const { data, loading } = useFetch("/movie/upcoming");

  useEffect(() => {
    const bg =
      url.backdrop +
      data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
    console.log(`bg is ${bg}`);
    setbackground(bg);
  }, [data]);
  const searchqueryHandler = (event) => {
    if (event.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
    }
  };
  return (
    <div className="heroBanner">
      {!loading && (
        <div className="backdrop-img">
          <Img src={background} />
        </div>
      )}
      <div className="opacity-layer"></div>
      <ContentWrapper>
        <div className="heroBannerContent">
          <span className="title">Welcome</span>
          <span className="subtitle">
            Millions of movie,Tv shows and people to discover. Explore now
          </span>
          <div className="searchInput">
            <input
              type="text"
              placeholder="Search for a movie of tv show..."
              onChange={(e) => setquery(e.target.value)}
              onKeyUp={searchqueryHandler}
            />
            <button>Search</button>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default HeroBanner;
