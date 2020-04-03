import React from "react";
import { useParams, useLocation } from "react-router-dom";
import { isRight } from "fp-ts/lib/Either";
import { IShopItemRuntime, IShopItem } from "../../io-ts-types";
import { useStores } from "../../hooks/use-stores";
import { observer } from "mobx-react";
import ItemDetail from "../../components/ItemDetail/ItemDetail";
import Carousel from "../../components/Carousel/Carousel";
import styled from "styled-components";
import { rem } from "polished";

const DetailContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: ${rem(25)};
`;

const parseLocationState = (jsonString: string): IShopItem | undefined => {
  let data;
  try {
    data = JSON.parse(jsonString);
  } catch (error) {
    return undefined;
  }

  if (typeof data !== "object") return undefined;

  const { createdAt, updatedAt } = data;
  const parsed = {
    ...data,
    createdAt: createdAt ? new Date(createdAt) : undefined,
    updatedAt: updatedAt ? new Date(updatedAt) : undefined
  };
  return parsed;
};

const Detail: React.FC = observer(() => {
  const { id } = useParams();
  const { state } = useLocation<string>();
  const { detailStore } = useStores();
  const status = detailStore.status.state;
  const error = detailStore.status.error;

  React.useEffect(() => {
    const parsedShopItemData = parseLocationState(state);
    if (parsedShopItemData && isRight(IShopItemRuntime.decode(parsedShopItemData))) {
      detailStore.setItem(parsedShopItemData);
    } else {
      detailStore.fetchItem(id as string);
    }
  }, [detailStore, id, state]);

  if (status === "error") {
    return <p>{error.message}</p>;
  }

  if (status === "pending" || status === "inactive") {
    return <p>Loading...</p>;
  }

  return (
    <DetailContainer>
      {detailStore.item && (
        <Carousel images={[detailStore.item.images.thumb, detailStore.item.images.thumb, detailStore.item.images.thumb]} />
      )}
      {detailStore.item && <ItemDetail item={detailStore.item} />}
    </DetailContainer>
  );
});

export default Detail;
