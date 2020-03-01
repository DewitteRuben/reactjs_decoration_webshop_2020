import { rem } from "polished";
import React from "react";
import styled from "styled-components";

const StyledPopupCard = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-flow: dense;
  grid-row-gap: ${rem(10)};
  max-width: ${rem(390)};
  padding: ${rem(20)};

  box-shadow: 0 ${rem(14)} ${rem(28)} rgba(0, 0, 0, 0.25), 0 ${rem(10)} ${rem(10)} rgba(0, 0, 0, 0.22);
`;

export interface Category {
  id: number;
  name: string;
  key: string;
}

interface IProps {
  categories: Category[];
}

const PopupCard: React.FC<IProps & React.HTMLAttributes<HTMLDivElement>> = ({ categories, className }) => {
  return (
    <StyledPopupCard className={className}>
      {categories.map(e => (
        <div>{e.name}</div>
      ))}
    </StyledPopupCard>
  );
};

export default PopupCard;
