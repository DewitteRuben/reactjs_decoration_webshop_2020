import React from "react";
import { IShopItem } from "../../io-ts-types";
import styled from "styled-components";
import { rem } from "polished";
import Icon from "../Icon/Icon";
import _ from "lodash";
import CategoryBreadcrumbs from "../CategoryBreadcrumbs/CategoryBreadcrumbs";
import ButtonWithIcon from "../ButtonWithIcon/ButtonWithIcon";
import { useStores } from "../../hooks/use-stores";
import Typography from "../Typography/Typography";
import UserInfoCard from "../UserInfoCard/UserInfoCard";
import { observer } from "mobx-react";
import moment from "moment";
import ItemDetailAction from "../ItemDetailAction/ItemDetailAction";
import { Spacer } from "../Layout";
import Skeleton from "react-loading-skeleton";

type IItemDetailProps = {
  item?: IShopItem;
  loading?: boolean;
};

const ItemDetailIcon = styled(Icon)`
  margin: 0 ${rem(8)};
`;

const ItemMainInfo = styled(Typography)`
  display: flex;
  line-height: ${rem(28)};
  margin: ${rem(14)} 0;

  ${ItemDetailIcon}:first-of-type {
    margin-left: 0;
  }
`;

const ItemDetailPrice = styled(Typography)`
  margin: ${rem(14)} 0;
`;

const DetailContainer = styled.div`
  width: ${rem(702)};
  position: relative;
`;

const ButtonContainer = styled.div`
  display: flex;
  margin-top: 10px;

  button {
    margin-right: 10px;
  }
`;

const ActionContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
`;

const ItemDetail: React.FC<IItemDetailProps> = observer(({ item, loading }) => {
  const { name, createdAt, condition, price, description, userId, id: itemId, wishlists } = item || {};
  const { cartStore, wishlistStore } = useStores();

  const isLoading = !item || loading;
  const isWishlisted = itemId ? wishlistStore.hasItem(itemId) : false;

  const handleAddToCart = () => {
    if (item) {
      cartStore.addItem(item);
    }
  };

  const handleAddToWishlist = () => {
    if (item) {
      wishlistStore.toggle(item);
    }
  };

  return (
    <DetailContainer>
      <CategoryBreadcrumbs hideCurrent />
      <Typography fontSize="largest">{isLoading ? <Skeleton width={180} /> : name}</Typography>
      <ItemMainInfo as="div" fontWeight="bold" fontSize="small" color="darkGray">
        <ItemDetailIcon name="clock" />
        <span>{isLoading ? <Skeleton width={150} height={20} /> : moment(createdAt).format("LLL")}</span>
        <ItemDetailIcon name="condition-label" />
        <span>{isLoading ? <Skeleton width={35} height={20} /> : _.capitalize(condition)}</span>
        <ItemDetailIcon name="heart" />
        <span>{isLoading ? <Skeleton width={10} height={20} /> : wishlists}</span>
      </ItemMainInfo>
      <ItemDetailPrice as="div" fontWeight="bold" fontSize="large">
        {isLoading ? <Skeleton width={50} /> : price}
      </ItemDetailPrice>
      <Typography fontSize="large">{isLoading ? <Skeleton /> : _.truncate(description, { length: 500 })}</Typography>
      <ButtonContainer>
        <ButtonWithIcon onClick={handleAddToCart} iconName="add-shopping-cart">
          {"Add to cart"}
        </ButtonWithIcon>
        <ButtonWithIcon onClick={handleAddToWishlist} iconName={isWishlisted ? "heart-fill" : "heart"}>
          {isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        </ButtonWithIcon>
      </ButtonContainer>
      {userId && (
        <ActionContainer>
          <UserInfoCard userId={userId} />
          <Spacer />
          {itemId && <ItemDetailAction itemId={itemId} userId={userId} />}
        </ActionContainer>
      )}
    </DetailContainer>
  );
});

export default ItemDetail;
