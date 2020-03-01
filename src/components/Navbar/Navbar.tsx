import { observer } from "mobx-react";
import { lighten, rem } from "polished";
import React from "react";
import styled from "styled-components";
import navData from "../../data/nav.json";
import { useStores } from "../../hooks/use-stores";
import NavigationStore from "../../store/NavigationStore";
import NavPositionCircle from "../NavPositionCircle/NavPositionCircle";

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

const computeCirclePosition = (navElement?: HTMLElement) => {
  if (!navElement) return 0;
  return navElement.offsetLeft + navElement.offsetWidth / 2;
};

const handleNavChange = (store: NavigationStore, key: string) => (
  event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
) => {
  event.preventDefault();
  store.navElement = event.target as HTMLElement;
  store.setCurrentPosition(key);
};

const data2li = (store: NavigationStore) =>
  navData.map(e => (
    <li key={e.key}>
      <Anchor data-item={e.key} selected={store.currentNav === e.key} href="#" onClick={handleNavChange(store, e.key)}>
        {e.name}
      </Anchor>
    </li>
  ));

const Navbar: React.FC = observer(() => {
  const { navStore } = useStores();
  const navRef = React.useRef<HTMLUListElement | null>(null);
  const [offset, setOffset] = React.useState(0);

  React.useEffect(() => {
    if (navRef?.current && !navStore.navElement && navRef?.current?.firstChild) {
      const firstLI = navRef?.current?.firstChild as HTMLElement;
      const firstAnchor = firstLI.firstChild as HTMLElement;
      navStore.setElement(firstLI);
      navStore.setCurrentPosition(firstAnchor.dataset.item || "");
    }
    setOffset(computeCirclePosition(navStore.navElement));
  }, [navStore.navElement, navStore.currentNav, navRef]);

  React.useEffect(() => {
    const onResize = () => setOffset(computeCirclePosition(navStore.navElement));

    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [navStore.navElement]);

  return (
    <StyledNavContainer>
      <StyledNavbar>
        <NavUL ref={navRef}>{data2li(navStore)}</NavUL>
      </StyledNavbar>
      <StyledCircle offset={offset} />
    </StyledNavContainer>
  );
});

export default Navbar;
