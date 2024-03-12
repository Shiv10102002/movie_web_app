import React from "react";
import useFetch from "../../../hooks/useFetch";
import Carousal from "../../../components/carsection/Carousal";

const Recommendation = ({ mediaType, id }) => {
  const { data, loading, error } = useFetch(
    `/${mediaType}/${id}/recommendations`
  );

  return (
    <Carousal
      title="Recommendations"
      data={data?.results}
      loading={loading}
      endpoint={mediaType}
    />
  );
};

export default Recommendation;
