import { rem } from "polished";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Card from "../Card/Card";

const StyledPopupCard = styled(Card)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-flow: dense;
  grid-row-gap: ${rem(10)};
  max-width: ${rem(390)};
`;

export interface Subcategory {
  id: number;
  name: string;
  key: string;
}

export interface Category {
  name: string;
  key: string;
  subcategories: Subcategory[];
}

interface IProps {
  category?: Category;
}

const Anchor = styled(Link)`
  text-decoration: none;
  color: ${props => props.theme.black};

  &:hover {
    border-bottom: 1px solid black;
  }
`;

const PopupCard = React.forwardRef(
  (
    props: IProps & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
    ref: React.Ref<HTMLDivElement | null>
  ) => {
    const { onMouseLeave, className, category } = props;
    return (
      <StyledPopupCard
        ref={ref as ((instance: HTMLDivElement | null) => void) | React.RefObject<HTMLDivElement> | null | undefined}
        onMouseLeave={onMouseLeave}
        className={className}
      >
        {category?.subcategories.map(subcategory => (
          <div key={subcategory.key}> 
            <Anchor to={`/${category.key}/${subcategory.key}`}>{subcategory.name}</Anchor>
          </div>
        ))}
      </StyledPopupCard>
    );
  }
);

export default PopupCard;
