import React from "react";
import { useParams, useLocation } from "react-router-dom";
import styled from "styled-components";

const StyledDetail = styled.div`
  grid-area: detail;
`;

const Detail: React.FC = () => {
  const { category, subCategory, itemCategory, specificCategory, id } = useParams();
  const { state } = useLocation();

  return (
    <>
      <div>{id}</div>
    </>
  );
};

export default Detail;
