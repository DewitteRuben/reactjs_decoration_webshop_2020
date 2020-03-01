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

const PopupCard = React.forwardRef(
  (
    props: IProps & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
    ref: React.Ref<HTMLDivElement | null>
  ) => {
    const { onMouseLeave, className, categories } = props;
    return (
      <StyledPopupCard
        ref={ref as ((instance: HTMLDivElement | null) => void) | React.RefObject<HTMLDivElement> | null | undefined}
        onMouseLeave={onMouseLeave}
        className={className}
      >
        {categories.map(e => (
          <div key={e.key}>{e.name}</div>
        ))}
      </StyledPopupCard>
    );
  }
);

export default PopupCard;
