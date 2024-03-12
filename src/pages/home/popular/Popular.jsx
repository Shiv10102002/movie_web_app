import React, { useState } from "react";
import ContentWrapper from "../../../components/contwrap/ContetnWrapper";
import SwitchTabs from "../../../components/switchTabs/SwitchTabs";

import Carousal from "../../../components/carsection/Carousal";
import useFetch from "../../../hooks/useFetch";

const Popular = () => {
  const [endpoint, setEndpoint] = useState("movie");
  const { data, loading } = useFetch(`/${endpoint}/popular`);
  const onTabChange = (tab) => {
    setEndpoint(tab === "Movies" ? "movie" : "tv");
  };
  return (
    <div className="carouselSection">
      <ContentWrapper>
        <span className="carouselTitle">Whats Popular</span>
        <SwitchTabs data={["Movies", "Tv Shows"]} onTabChange={onTabChange} />
      </ContentWrapper>
      <Carousal data={data?.results} loading={loading} endpoint={endpoint} />
    </div>
  );
};

export default Popular;
