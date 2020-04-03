import React from "react";
import styled from "styled-components";
import { rem } from "polished";
import Icon from "../Icon/Icon";
import useClickOutside from "../../hooks/use-clickoutside";
import Typography from "../Typography/Typography";

const SelectContainer = styled.div`
  padding: 7px 12px;
  border-radius: 8px;
  cursor: pointer;
  line-height: 1;
  letter-spacing: 0.5px;
  background-color: ${props => props.theme.white};
  user-select: none;
  border: 1px solid ${props => props.theme.darkBorder};
`;

const ItemContainer = styled.div`
  position: absolute;
  border: 1px solid ${props => props.theme.darkBorder};
  z-index: 10;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  margin-top: 8px;
  background: ${props => props.theme.white};
`;

const Label = styled(Typography)`
  margin-right: ${rem(5)};
`;

interface ICaret {
  open: boolean;
}

const Caret = styled(Icon)<ICaret>`
  transition: transform 0.1s linear;
  transform: ${props => `rotate(${props.open ? "-180" : "0"}deg)`};
`;

const ItemList = styled.ul`
  postion: relative;
  list-style: none;
  margin: 0;
  padding: 0;

  li {
    line-height: 36px;
  }
`;

const ListItem = styled.li`
  width: inherit;
  display: block;
`;

const ItemButton = styled.a`
  display: inline-block;
  height: inherit;
  text-decoration: none;
  cursor: pointer;
  width: 100%;
  box-sizing: border-box;
  padding: 0 20px;

  &:hover {
    background-color: #ddd;
  }
`;

const ClearIcon = styled.span`
  position: absolute;
  bottom: 8px;
  right: 23px;
  font-size: 19px;
  user-select: none;
  cursor: pointer;
  pointer-events: none;
`;

export interface IItem {
  name: string;
  value: any;
}

export interface ISelectProps extends React.HTMLAttributes<HTMLDivElement> {
  items: IItem[];
  onValueChange?: (item: IItem) => void;
  label: string;
  clear?: boolean;
}

const Select: React.FC<ISelectProps> = ({ label, items, onValueChange, clear, ...props }) => {
  const [selectedItem, setSelectedItem] = React.useState<IItem>();
  const [isVisible, setVisbility] = React.useState(false);
  const toggler = React.useRef<HTMLDivElement | null>(null);

  const handleClickOutside = () => {
    setVisbility(false);
  };

  const containerRef = useClickOutside<HTMLDivElement>(handleClickOutside, toggler.current);

  const handleToggle = () => {
    setVisbility(prev => !prev);
  };

  const handleItemClick = (item: IItem) => (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault();
    setSelectedItem(item.value?.clearSelectState ? undefined : item);

    if (onValueChange) {
      onValueChange(item);
    }
    setVisbility(false);
  };

  return (
    <div>
      <SelectContainer ref={toggler} onClick={handleToggle} {...props}>
        <Label fontWeight={selectedItem ? "bold" : "normal"}>{selectedItem?.name || label}</Label>
        <Caret open={isVisible} name="arrow-down" size={11} />
      </SelectContainer>
      {isVisible && (
        <ItemContainer ref={containerRef}>
          <ItemList>
            {items.map((item: IItem, i) => (
              <ListItem key={`${item.name}-${i}`}>
                <ItemButton onClick={handleItemClick(item)}>{item.name}</ItemButton>
              </ListItem>
            ))}
            {clear && selectedItem && (
              <>
                <ListItem key={"clearSelectOption"}>
                  <ItemButton onClick={handleItemClick({ name: "Clear", value: { clearSelectState: true } })}>
                    {"Clear"}
                  </ItemButton>
                </ListItem>
                <ClearIcon>x</ClearIcon>
              </>
            )}
          </ItemList>
        </ItemContainer>
      )}
    </div>
  );
};

export default Select;
