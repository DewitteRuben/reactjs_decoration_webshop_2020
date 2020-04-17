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

type IItemDetailProps = {
  item: IShopItem;
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

const ItemDetail: React.FC<IItemDetailProps> = observer(({ item }) => {
  const { name, createdAt, condition, price, description, userId } = item;
  const { cartStore, wishlistStore } = useStores();
  const isWishlisted = wishlistStore.hasItem(item.id);

  const handleAddToCart = () => {
    cartStore.addItem(item);
  };

  const handleAddToWishlist = () => {
    wishlistStore.toggle(item);
  };

  return (
    <DetailContainer>
      <CategoryBreadcrumbs hideCurrent />
      <Typography fontSize="largest">{name}</Typography>
      <ItemMainInfo as="div" fontWeight="bold" fontSize="small" color="darkGray">
        <ItemDetailIcon name="clock" />
        <span>{createdAt?.toLocaleString()}</span>
        <ItemDetailIcon name="condition-label" />
        <span>{_.capitalize(condition)}</span>
        <ItemDetailIcon name="heart-fill" />
        <span>{item.wishlists}</span>
      </ItemMainInfo>
      <ItemDetailPrice as="div" fontWeight="bold" fontSize="large">
        {price}
      </ItemDetailPrice>
      <Typography fontSize="large">{description}</Typography>
      <ButtonContainer>
        <ButtonWithIcon onClick={handleAddToCart} iconName="add-shopping-cart">
          Add to cart
        </ButtonWithIcon>
        <ButtonWithIcon onClick={handleAddToWishlist} iconName={isWishlisted ? "heart-fill" : "heart"}>
          {isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        </ButtonWithIcon>
      </ButtonContainer>
      <UserInfoCard userId={userId} />
    </DetailContainer>
  );
});

export default ItemDetail;
