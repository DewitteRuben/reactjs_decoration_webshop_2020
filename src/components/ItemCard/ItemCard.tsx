import { rem } from "polished";
import React from "react";
import styled from "styled-components";
import FavoriteIcon from "../FavoriteIcon/FavoriteIcon";
import { useHistory } from "react-router-dom";
import * as H from "history";
import { IShopItem } from "../../io-ts-types";
import _ from "lodash";
import { getLocationFromShopItem } from "../../utils/navigation";
import Typography from "../Typography/Typography";
import ButtonUnstyled from "../ButtonUnstyled/ButtonUnstyled";

const ActionBar = styled.div`
  position: absolute;
  top: 0;
  padding: 5px 10px;
  box-sizing: border-box;
  display: flex;
  justify-content: flex-end;
  width: 100%;
  opacity: 0;
  transition: all 0.25s ease-in;
  transition-property: opacity, background-color;
`;

const CardContainer = styled.div`
  position: relative;
  height: ${rem(462)};
  border-radius: 10px;

  &:hover {
    cursor: pointer;

    ${ActionBar} {
      opacity: 1;
      background-color: rgba(255, 255, 255, 0.5);
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
  border-radius: 10px;
`;

const ItemBody = styled.div`
  display: flex;
  justify-content: space-between;
  height: ${rem(32)};
`;

const ItemDescription = styled(Typography)`
  color: ${props => props.theme.darkGray};
  width: ${rem(185)};
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const ItemFooter = styled.div`
  display: flex;
  justify-content: space-between;
`;

interface IProps {
  item: IShopItem;
}

const viewItemDetail = (item: IShopItem, history: H.History<H.LocationState>) => () => {
  const location = getLocationFromShopItem(item);
  history.push(location);
};

const ItemCard: React.FC<IProps> = ({ item, ...other }) => {
  const { images, name, description, condition, price } = item;
  const firstImage = images[0];
  const history = useHistory();

  return (
    <CardContainer>
      <ButtonUnstyled onClick={viewItemDetail(item, history)}>
        <Image src={firstImage.thumb} alt={name} />
        <CardDetailContainer>
          <ItemBody>
            <Typography fontWeight="bold" as="p">
              {name}
            </Typography>
            <Typography fontWeight="bold" fontSize="large" as="p">
              {"€" + price.toFixed(2)}
            </Typography>
          </ItemBody>
          <ItemFooter>
            <ItemDescription>{description}</ItemDescription>
            <Typography color="darkGray">{_.capitalize(condition)}</Typography>
          </ItemFooter>
        </CardDetailContainer>
        <ActionBar>
          <FavoriteIcon />
        </ActionBar>
      </ButtonUnstyled>
    </CardContainer>
  );
};

export default ItemCard;
