import React, { useCallback } from "react";
import Icon from "../Icon/Icon";
import styled from "styled-components";

interface IStyledIconProps {
  pressed?: boolean;
}

// filter out unused props to prevent React DOM attr errors
const StyledIcon = styled(({ pressed, ...props }) => <Icon {...props} />)<IStyledIconProps>`
  transition: transform 0.1s ease-in-out;
  transform: ${props => (props.pressed ? "scale(1.20)" : "scale(1.00)")};

  path {
    fill: ${props => props.theme.black};
    fill-opacity: 1;
  }
`;

interface IFavoriteIconProps {
  active?: boolean;
  onFavorite?: (state: boolean) => void;
}

const FavoriteIcon: React.FC<IFavoriteIconProps> = ({ active, onFavorite }) => {
  const [heartFilled, setHeartFilledState] = React.useState(false);
  const [isFavorite, setClickState] = React.useState(active);
  const [isMouseDown, setMouseState] = React.useState(false);

  const onMouseDown = useCallback(
    (event: MouseEvent) => {
      event.preventDefault();
      event.stopPropagation();
      setMouseState(true);
      setClickState(prev => !prev);
      if (onFavorite) {
        onFavorite(!isFavorite);
      }
    },
    [isFavorite, onFavorite]
  );

  React.useEffect(() => {
    setHeartFilledState(isFavorite ? true : false);
  }, [isFavorite]);

  React.useEffect(() => {
    const onMouseUp = () => {
      setMouseState(false);
      setHeartFilledState(isFavorite ? true : false);
    };

    document.addEventListener("mouseup", onMouseUp);

    return () => {
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, [isFavorite]);

  return <StyledIcon pressed={isMouseDown} onMouseDown={onMouseDown} name={heartFilled ? "heart-fill" : "heart"} />;
};

export default FavoriteIcon;
