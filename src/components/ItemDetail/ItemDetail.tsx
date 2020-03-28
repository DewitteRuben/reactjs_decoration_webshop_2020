import React from "react";
import { IShopItem } from "../../io-ts-types";
import styled from "styled-components";
import { rem } from "polished";
import Icon from "../Icon/Icon";
import _ from "lodash";
import CategoryBreadcrumbs from "../CategoryBreadcrumbs/CategoryBreadcrumbs";
import ButtonWithIcon from "../ButtonWithIcon/ButtonWithIcon";

type IItemDetailProps = {
  item: IShopItem;
};

const ItemName = styled.span`
  font-size: ${rem(34)};
`;

const ItemDetailIcon = styled(Icon)`
  margin-right: ${rem(8)};
`;

const ItemMainInfo = styled.div`
  display: flex;
  font-size: ${rem(14)};
  font-weight: bold;
  line-height: ${rem(28)};
  color: ${props => props.theme.darkGray};
  margin: ${rem(14)} 0;

  ${ItemDetailIcon}:last-of-type {
    margin-left: ${rem(8)};
  }
`;

const ItemDetailPrice = styled.div`
  font-size: ${rem(18)};
  margin: ${rem(14)} 0;
  font-weight: 600;
`;

const Description = styled.div`
  font-size: ${rem(18)};
`;

const DetailContainer = styled.div`
  width: ${rem(702)};
`;

const ButtonContainer = styled.div`
  display: flex;

  button {
    margin-right: 10px;
  }
`;

const ItemDetail: React.FC<IItemDetailProps> = ({ item }) => {
  const { name, createdAt, stateOfProduct, price, description } = item;
  return (
    <DetailContainer>
      <CategoryBreadcrumbs hideCurrent />
      <ItemName>{name}</ItemName>
      <ItemMainInfo>
        <ItemDetailIcon name="clock" />
        <span>{createdAt?.toLocaleString()}</span>
        <ItemDetailIcon name="condition-label" />
        <span>{_.capitalize(stateOfProduct)}</span>
      </ItemMainInfo>
      <ItemDetailPrice>{price}</ItemDetailPrice>
      <Description>{description}</Description>
      <ButtonContainer>
        <ButtonWithIcon iconName="add-shopping-cart">Add to cart</ButtonWithIcon>
        <ButtonWithIcon iconName="heart">Add to wishlist</ButtonWithIcon>
      </ButtonContainer>
    </DetailContainer>
  );
};

export default ItemDetail;
