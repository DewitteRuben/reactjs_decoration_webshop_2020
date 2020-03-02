import { rem } from "polished";
import React from "react";
import styled from "styled-components";

const CardContainer = styled.div`
  width: ${rem(260)};
  height: ${rem(462)};
`;

const CardDetailContainer = styled.div`
  width: ${rem(240)};
  height: ${rem(92)};
  padding: ${rem(10)};
`;

const Image = styled.img`
  width: ${rem(260)};
  height: ${rem(360)};
  box-shadow: 0 ${rem(4)} ${rem(4)} rgba(0, 0, 0, 0.25);
`;

const ItemBody = styled.div`
  width: ${rem(260)};
  height: ${rem(74)};
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
  height: ${rem(18)};
`;

interface IProps {
  title: string;
  description: string;
  price: number;
  currency: string;
  state: string;
}

const ItemCard: React.FC<IProps> = ({ title, description, price, state, ...other }) => {
  return (
    <CardContainer>
      <Image src="https://via.placeholder.com/260x360.png?text=Placeholder" alt="" />
      <CardDetailContainer>
        <ItemBody>
          <Price>{"€" + price.toFixed(2)}</Price>
          <Title>{title}</Title>
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
