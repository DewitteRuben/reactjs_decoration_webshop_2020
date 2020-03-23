import { rem } from "polished";
import React from "react";
import styled from "styled-components";
import { IShopItem } from "../../store/ItemStore";
import Icon from "../Icon/Icon";
import FavoriteIcon from "../FavoriteIcon/FavoriteIcon";

const ActionBar = styled.div`
  position: absolute;
  top: 0;
  padding: 5px 10px;
  box-sizing: border-box;
  display: flex;
  justify-content: flex-end;
  width: 100%;
  opacity: 0;
  transition: opacity 0.25s ease-in;
`;

const CardContainer = styled.div`
  position: relative;
  height: ${rem(462)};

  &:hover {
    cursor: pointer;

    ${ActionBar} {
      opacity: 1;
    }
  }
`;

const CardDetailContainer = styled.div`
  height: ${rem(64)};
  padding: ${rem(10)};
`;

const Image = styled.img`
  height: ${rem(360)};
  width: ${rem(260)};
  box-shadow: 0 ${rem(4)} ${rem(4)} rgba(0, 0, 0, 0.25);
`;

const ItemBody = styled.div`
  display: flex;
  justify-content: space-between;
  height: ${rem(32)};
`;

const Title = styled.span`
  font-weight: bold;
  display: block;
`;

const Price = styled.span`
  font-weight: bold;
  display: block;
  font-size: ${rem(18)};
`;

const SubParagraph = styled.span`
  color: ${props => props.theme.darkGray};
`;

const ItemFooter = styled.div`
  display: flex;
  justify-content: space-between;
  height: ${rem(16)};
`;

interface IProps {
  item: IShopItem;
}

const ItemCard: React.FC<IProps> = ({ item, ...other }) => {
  const { images, name, description, stateOfProduct, price } = item;

  return (
    <CardContainer>
      <Image src={images.thumb} alt={name} />
      <CardDetailContainer>
        <ItemBody>
          <Title>{name}</Title>
          <Price>{"€" + price.toFixed(2)}</Price>
        </ItemBody>
        <ItemFooter>
          <SubParagraph>{description}</SubParagraph>
          <SubParagraph>{stateOfProduct}</SubParagraph>
        </ItemFooter>
      </CardDetailContainer>
      <ActionBar>
        <FavoriteIcon />
      </ActionBar>
    </CardContainer>
  );
};

export default ItemCard;
