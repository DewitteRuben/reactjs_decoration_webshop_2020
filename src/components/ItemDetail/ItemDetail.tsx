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
  margin-right: ${rem(8)};
`;

const ItemMainInfo = styled(Typography)`
  display: flex;
  line-height: ${rem(28)};
  margin: ${rem(14)} 0;

  ${ItemDetailIcon}:last-of-type {
    margin-left: ${rem(8)};
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
  const { cartStore } = useStores();

  const handleAddToCart = () => {
    cartStore.addItem(item);
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
      </ItemMainInfo>
      <ItemDetailPrice as="div" fontWeight="bold" fontSize="large">
        {price}
      </ItemDetailPrice>
      <Typography fontSize="large">{description}</Typography>
      <ButtonContainer>
        <ButtonWithIcon onClick={handleAddToCart} iconName="add-shopping-cart">
          Add to cart
        </ButtonWithIcon>
        <ButtonWithIcon iconName="heart">Add to wishlist</ButtonWithIcon>
      </ButtonContainer>
      <UserInfoCard userId={userId} />
    </DetailContainer>
  );
});

export default ItemDetail;
