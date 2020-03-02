import { rem } from "polished";
import React from "react";
import styled from "styled-components";

const CardContainer = styled.div`
  height: ${rem(462)};
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
  title: string;
  description: string;
  price: number;
  currency: string;
  state: string;
  image: string;
}

const ItemCard: React.FC<IProps> = ({ title, description, price, state, currency, image, ...other }) => {
  return (
    <CardContainer>
      <Image src={image} alt="" />
      <CardDetailContainer>
        <ItemBody>
          <Title>{title}</Title>
          <Price>{currency + price.toFixed(2)}</Price>
        </ItemBody>
        <ItemFooter>
          <SubParagraph>{description}</SubParagraph>
          <SubParagraph>{state}</SubParagraph>
        </ItemFooter>
      </CardDetailContainer>
    </CardContainer>
  );
};

export default ItemCard;
