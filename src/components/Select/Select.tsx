import React from "react";
import styled from "styled-components";
import { rem } from "polished";
import Icon from "../Icon/Icon";

const SelectContainer = styled.div`
  padding: 7px 12px;
  border-radius: 8px;
  cursor: pointer;
  line-height: 1;
  letter-spacing: 0.5px;
  background-color: #fff;
  color: #1a1a1a;
  user-select: none;
  border: 1px solid #ddd;
`;

const ItemContainer = styled.div`
  position: absolute;
  border: 1px solid #ddd;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  margin-top: 8px;
  background: #fff;
`;

const Span = styled.span`
  margin-right: ${rem(5)};
`;

interface ICaret {
  toggled: boolean;
}

const Caret = styled(Icon)<ICaret>`
  transition: transform 0.1s linear;
  transform: ${props => `rotate(${props.toggled ? "-180" : "0"}deg)`};
`;

const ItemList = styled.ul`
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

export interface IItem {
  name: string;
  value: any;
}

interface IProps {
  items: IItem[];
  onValueChange?: (item: IItem) => void;
  label?: string;
}

const Select: React.FC<React.HTMLAttributes<HTMLDivElement> & IProps> = ({ label, items, onValueChange, ...props }) => {
  const [isVisible, setVisbility] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState<IItem>();

  const handleToggle = () => {
    setVisbility(prev => !prev);
  };

  const handleItemClick = (item: IItem) => (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault();
    setSelectedItem(item);
    if (onValueChange) {
      onValueChange(item);
    }
    setVisbility(false);
  };

  return (
    <>
      <SelectContainer onClick={handleToggle} {...props}>
        <Span>{selectedItem?.name || label}</Span>
        <Caret toggled={isVisible} name="arrow-down" size={11} />
      </SelectContainer>
      {isVisible && (
        <ItemContainer>
          <ItemList>
            {items.map((item: IItem, i) => (
              <ListItem key={`${item.name}-${i}`}>
                <ItemButton onClick={handleItemClick(item)}>{item.name}</ItemButton>
              </ListItem>
            ))}
          </ItemList>
        </ItemContainer>
      )}
    </>
  );
};

export default Select;
