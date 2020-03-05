import { observer } from "mobx-react";
import { lighten, rem } from "polished";
import React from "react";
import styled from "styled-components";
import { useStores } from "../../hooks/use-stores";
import NavigationStore from "../../store/NavigationStore";
import NavPositionCircle from "../NavPositionCircle/NavPositionCircle";
import PopupCard from "../PopupCard/PopupCard";

const StyledNavbar = styled.nav`
  height: ${rem(50)};
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 2px solid ${props => props.theme.gray};
`;

interface IAnchorProps {
  selected: boolean;
}

const Anchor = styled.a<IAnchorProps>`
  text-decoration: none;
  color: ${props => (props.selected ? lighten(0.5, props.theme.black) : props.theme.black)};
  padding: 5px 15px;
  background-color: ${props => (props.selected ? props.theme.opacityGray : props.theme.white)};
  border-radius: 20px;

  &:hover {
    color: ${props => lighten(0.5, props.theme.black)};
    background-color: ${props => props.theme.opacityGray};
    border-radius: 20px;
  }
`;

const NavUL = styled.ul`
  & > li {
    display: inline-block;
    margin-left: 50px;
    font-weight: bold;
  }
`;

const StyledNavContainer = styled.div`
  position: relative;
`;

interface IStyledCircleProps {
  offset: number;
}

const StyledCircle = styled(NavPositionCircle)<IStyledCircleProps>`
  position: absolute;
  top: ${rem(49)};
  left: ${props => rem(props.offset)};
  transition: left 0.5s ease-out;
`;

interface IStyledPopupCard {
  offset: number;
  display: boolean;
}

const StyledPopupCard = styled(PopupCard)<IStyledPopupCard>`
  position: absolute;
  top: ${rem(53)};
  background-color: ${props => props.theme.white};
  left: ${props => rem(props.offset)};
  display: ${props => (!props.display ? "none" : "grid")};
`;

const computeCenterPosOfElement = (navElement?: HTMLElement) => {
  if (!navElement) return 0;
  return navElement.offsetLeft + navElement.offsetWidth / 2;
};

const handleNavChange = (store: NavigationStore, key: string) => (
  event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
) => {
  event.preventDefault();
  store.setSelectedElement(event.target as HTMLElement);
};

const handleOnMouseEnter = (store: NavigationStore, key: string) => (
  event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
) => {
  event.preventDefault();
  store.setHoverState(true);
  store.setHoverElement(event.target as HTMLElement);
};

const data2li = (store: NavigationStore) =>
  store.data.map(e => (
    <li key={e.key}>
      <Anchor
        onMouseOver={handleOnMouseEnter(store, e.key)}
        data-item={e.key}
        selected={store.getCurrentSelectedPosition() === e.key}
        href="#"
        onClick={handleNavChange(store, e.key)}
      >
        {e.name}
      </Anchor>
    </li>
  ));

const Navbar: React.FC = observer(() => {
  const { navStore } = useStores();
  const navRef = React.useRef<HTMLUListElement | null>(null);
  const popupRef = React.useRef<HTMLDivElement | null>(null);
  const [circleOffset, setCircleOffset] = React.useState(0);
  const [popupOffset, setPopupOffset] = React.useState(0);

  React.useEffect(() => {
    const onMouseMove = function(e: MouseEvent) {
      if (navStore.hoverState && popupRef.current) {
        const { top, left, width, height } = popupRef.current.getBoundingClientRect();
        const mouseX = e.pageX;
        const mouseY = e.pageY;

        const xPosInContainer = mouseX - left;
        const yPosInContainer = mouseY - top;

        if (
          navStore.hoverState &&
          !(xPosInContainer >= -60 && xPosInContainer <= width && yPosInContainer >= -50 && yPosInContainer <= height)
        ) {
          navStore.setHoverState(false);
        }
      }
    };

    document.addEventListener("mousemove", onMouseMove);

    return () => document.removeEventListener("mousemove", onMouseMove);
  }, [navStore]);

  React.useEffect(() => {
    // if no nav item has been selected, select the first one
    if (navRef?.current && !navStore.navElement && navRef?.current?.firstChild) {
      const firstLI = navRef?.current?.firstChild as HTMLElement;
      const firstAnchor = firstLI.firstChild as HTMLElement;
      navStore.setSelectedElement(firstAnchor);
    }

    setCircleOffset(computeCenterPosOfElement(navStore.navElement));
    setPopupOffset(computeCenterPosOfElement(navStore.hoverElement));
    navStore.setHoverState(true);
  }, [navStore, navStore.navElement, navStore.hoverElement, navRef]);

  React.useEffect(() => {
    const onResize = () => {
      setCircleOffset(computeCenterPosOfElement(navStore.navElement));
      setPopupOffset(computeCenterPosOfElement(navStore.hoverElement));
    };

    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [navStore.hoverElement, navStore.navElement]);

  return (
    <StyledNavContainer>
      <StyledNavbar>
        <NavUL ref={navRef}>{data2li(navStore)}</NavUL>
      </StyledNavbar>
      <StyledCircle offset={circleOffset} />
      <StyledPopupCard
        ref={popupRef}
        display={navStore.hoverState}
        offset={popupOffset}
        category={navStore.getHoveredCategory()}
      />
    </StyledNavContainer>
  );
});

export default Navbar;
