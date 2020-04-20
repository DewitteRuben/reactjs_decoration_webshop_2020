import React from "react";
import { useParams } from "react-router-dom";
import { useStores } from "../../hooks/use-stores";
import { observer } from "mobx-react";
import ItemDetail from "../../components/ItemDetail/ItemDetail";
import Carousel from "../../components/Carousel/Carousel";
import styled from "styled-components";
import { rem } from "polished";
import Container from "../../components/Container/Container";

const DetailContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: ${rem(25)};
`;

const Detail: React.FC = observer(() => {
  const { id } = useParams();
  const { detailStore } = useStores();
  const status = detailStore.status.state;
  const error = detailStore.status.error;
  const isLoading = status === "pending" || status === "inactive";

  React.useEffect(() => {
    if (id) {
      detailStore.fetchItem(id);
    }
  }, [detailStore, id]);

  if (status === "error") {
    return <p>{error.message}</p>;
  }

  return (
    <Container>
      <DetailContainer>
        <Carousel loading={isLoading} images={detailStore.item?.images} />
        <ItemDetail loading={isLoading} item={detailStore.item} />
      </DetailContainer>
    </Container>
  );
});

export default Detail;
