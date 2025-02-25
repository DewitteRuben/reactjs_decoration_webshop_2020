import { observer } from "mobx-react";
import { rem } from "polished";
import React from "react";
import styled from "styled-components";
import { useStores } from "../../hooks/use-stores";
import NavigationStore from "../../store/NavigationStore";
import NavPositionCircle from "../NavPositionCircle/NavPositionCircle";
import PopupCard from "../PopupCard/PopupCard";
import NavbarLink from "../Link/NavbarLink/NavbarLink";
import { useLocation } from "react-router-dom";

const StyledNavbar = styled.nav`
  height: ${rem(50)};
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 2px solid ${props => props.theme.gray};
  user-select: none;
`;

const NavUL = styled.ul`
  & > li {
    display: inline-block;
    margin-left: 50px;
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
  z-index: 10;
  background-color: ${props => props.theme.white};
  left: ${props => rem(props.offset)};
  display: ${props => (!props.display ? "none" : "grid")};
`;

const computeCenterPosOfElement = (el?: HTMLElement) => {
  if (!el) return 0;
  return el.offsetLeft + el.offsetWidth / 2;
};

const handleNavChange = (store: NavigationStore) => (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
  store.setSelectedElement(event.target as HTMLElement);
};

const handleOnMouseEnter = (store: NavigationStore) => (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
  event.preventDefault();
  store.setHoverState(true);
  store.setHoverElement(event.target as HTMLElement);
};

const Navbar: React.FC = observer(() => {
  const { navStore } = useStores();
  const navRef = React.useRef<HTMLUListElement | null>(null);
  const popupRef = React.useRef<HTMLDivElement | null>(null);
  const [circleOffset, setCircleOffset] = React.useState(0);
  const [popupOffset, setPopupOffset] = React.useState(0);
  const data = navStore.data;
  const location = useLocation();
  const currentLocation = location.pathname;

  React.useEffect(() => {
    const hoverAreaXOffset = -60;
    const hoverAreaYOffset = -50;

    const onMouseMove = function(e: MouseEvent) {
      if (navStore.hoverState && popupRef.current) {
        const { top, left, width, height } = popupRef.current.getBoundingClientRect();
        const mouseX = e.pageX;
        const mouseY = e.pageY;

        const xPosInContainer = mouseX - left;
        const yPosInContainer = mouseY - top;

        if (
          navStore.hoverState &&
          !(
            xPosInContainer >= hoverAreaXOffset &&
            xPosInContainer <= width &&
            yPosInContainer >= hoverAreaYOffset &&
            yPosInContainer <= height
          )
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

  const handleOnSubitemClick = () => {
    if (navStore.hoverElement) {
      setCircleOffset(computeCenterPosOfElement(navStore.hoverElement));
      navStore.setSelectedElement(navStore.hoverElement);
    }
  };

  const storeData = React.useMemo(() => {
    return data.map(e => {
      return (
        <li key={e.key}>
          <NavbarLink
            onMouseOver={handleOnMouseEnter(navStore)}
            data-item={e.key}
            selected={currentLocation.includes(`/${e.key}`)}
            to={`/${e.key}`}
            onClick={handleNavChange(navStore)}
          >
            {e.name}
          </NavbarLink>
        </li>
      );
    });
  }, [data, navStore, currentLocation]);

  return (
    <StyledNavContainer>
      <StyledNavbar>
        <NavUL ref={navRef}>{storeData}</NavUL>
      </StyledNavbar>
      <StyledCircle offset={circleOffset} />
      <StyledPopupCard
        ref={popupRef}
        display={navStore.hoverState}
        offset={popupOffset}
        onClick={handleOnSubitemClick}
        category={navStore.getHoveredCategory()}
      />
    </StyledNavContainer>
  );
});

export default Navbar;
