import { rem } from "polished";
import React from "react";
import styled from "styled-components";
import Card from "../Card/Card";
import RouterLink from "../Link/RouterLink/RouterLink";

const StyledPopupCard = styled(Card)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-flow: dense;
  grid-row-gap: ${rem(10)};
  grid-column-gap: ${rem(15)};
  max-width: ${rem(390)};
`;

export interface ISubcategory {
  name: string;
  key: string;
}

export interface ICategory {
  name: string;
  key: string;
  subcategories: ISubcategory[];
}

interface IProps {
  category?: ICategory;
  onClick?: () => void;
}

const PopupCard = React.forwardRef(
  (
    props: IProps & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
    ref: React.Ref<HTMLDivElement | null>
  ) => {
    const { onClick, onMouseLeave, className, category } = props;

    return (
      <StyledPopupCard
        ref={ref as ((instance: HTMLDivElement | null) => void) | React.RefObject<HTMLDivElement> | null | undefined}
        onMouseLeave={onMouseLeave}
        className={className}
      >
        {category?.subcategories.map(subcategory => (
          <div key={subcategory.key}>
            <RouterLink onClick={onClick} to={`/${category.key}/${subcategory.key}`}>
              {subcategory.name}
            </RouterLink>
          </div>
        ))}
      </StyledPopupCard>
    );
  }
);

PopupCard.displayName = "PopupCard";

export default PopupCard;
