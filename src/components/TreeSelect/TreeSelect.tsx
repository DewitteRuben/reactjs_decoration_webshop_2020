import React from "react";
import _ from "lodash";
import Dropdown from "../Dropdown/Dropdown";
import DropdownItem from "../Dropdown/DropdownItem/DropdownItem";
import styled from "styled-components";
import InputRegular from "../InputRegular/InputRegular";
import useClickOutside from "../../hooks/use-clickoutside";
import Typography from "../Typography/Typography";
import Icon from "../Icon/Icon";
import ButtonUnstyled from "../ButtonUnstyled/ButtonUnstyled";

const TitleItem = styled(DropdownItem)`
  &:hover {
    opacity: 1;
    cursor: default;
  }
`;

const HiddenField = styled(InputRegular)`
  opacity: 0;
  position: absolute;
  z-index: -1;
`;

const SelectInput = styled(InputRegular)`
  &:hover {
    cursor: pointer;
  }
`;

const TreeSelectContainer = styled.div`
  width: 100%;
  position: relative;
`;

const DropdownOverflowContainer = styled.div`
  position: absolute;
  max-height: 200px;
  overflow-y: auto;
  padding: 2px;
  z-index: 10;
`;

const StyledDropdown = styled(Dropdown)`
  position: initial;
  transform: none;
  width: 300px;
  text-align: center;
`;

const Title = styled(Typography)`
  width: 100%;
`;

interface ITreeNode {
  name: string;
  key: string;
  nodesTitle?: string;
  nodes?: ITreeNode[];
}

interface ITreeSelectProps extends Omit<React.ComponentPropsWithoutRef<"input">, "onChange"> {
  rootNode: ITreeNode;
  defaultValue?: string;
  delimiter?: string;
  onChange?: (selected: ITreeNode[]) => void;
}

const changeVisibility = (setVisibility: React.Dispatch<React.SetStateAction<boolean>>, visible: boolean) => () => {
  setVisibility(visible);
};

const traverseInOrder = (node: ITreeNode, cb: (node: ITreeNode) => void) => {
  if (!node) return;

  cb(node);
  node.nodes?.forEach(node => traverseInOrder(node, cb));
};

const TreeSelect: React.FC<ITreeSelectProps> = ({
  rootNode,
  delimiter = "🡒",
  name,
  id,
  onChange,
  required,
  placeholder,
  defaultValue,
  ...props
}) => {
  const [prevNode, setPrevNode] = React.useState<ITreeNode[]>([]);
  const [currentNode, setCurrentNode] = React.useState<ITreeNode>(rootNode);
  const [selectedValues, setSelectedValues] = React.useState<ITreeNode[]>();
  const [isVisible, setVisibility] = React.useState(false);
  const hideDropdown = changeVisibility(setVisibility, false);
  const showDropdown = changeVisibility(setVisibility, true);

  const containerRef = useClickOutside<HTMLDivElement>(hideDropdown);

  React.useEffect(() => {
    if (defaultValue) {
      const categories = defaultValue.split(",");
      const nodes: ITreeNode[] = [];
      traverseInOrder(rootNode, (node: ITreeNode) => {
        if (categories.includes(node.key)) {
          nodes.push(node);
        }
      });

      setPrevNode(nodes.slice(0, -2));
      setCurrentNode(nodes[nodes.length - 2]);
      setSelectedValues(nodes.slice());
    }
  }, [defaultValue, rootNode]);

  const renderNext = (key: string, name: string) => () => {
    const next = _.filter(currentNode?.nodes, { key })[0];
    const selection = _.concat(
      prevNode.map(node => ({ key: node.key, name: node.name })),
      [
        { key: currentNode.key, name: currentNode.name },
        { key, name }
      ]
    );

    if (next.nodes) {
      setPrevNode(prev => _.concat(prev, currentNode));
      setCurrentNode(next);
    } else {
      setSelectedValues(selection);
      hideDropdown();
    }

    if (onChange) {
      onChange(selection);
    }
  };

  const getLeafValue = () => {
    return selectedValues?.map(value => value.name).join(` ${delimiter} `) || "";
  };

  const getFullPathValue = () => {
    return selectedValues?.map(value => value.key) || "";
  };

  const renderPrev = () => {
    const prev = _.last(prevNode);
    if (prev) {
      setPrevNode(prev => _.dropRight(prev));
      setCurrentNode(prev);
    }
  };

  return (
    <TreeSelectContainer {...props} ref={containerRef}>
      <HiddenField tabIndex={-1} required={required} name={name} defaultValue={getFullPathValue()} />
      <SelectInput readOnly id={id} placeholder={placeholder} value={getLeafValue()} onFocus={showDropdown} />
      <DropdownOverflowContainer>
        <StyledDropdown hideLastSeperator display={isVisible}>
          <TitleItem>
            {prevNode.length > 0 && (
              <ButtonUnstyled onClick={renderPrev}>
                <Icon name="arrow-back" />
              </ButtonUnstyled>
            )}
            <Title fontWeight="bold" align="center">
              {currentNode.nodesTitle}
            </Title>
          </TitleItem>
          {currentNode.nodes?.map(node => (
            <DropdownItem key={node.key} onClick={renderNext(node.key, node.name)}>
              {node.name}
            </DropdownItem>
          ))}
        </StyledDropdown>
      </DropdownOverflowContainer>
    </TreeSelectContainer>
  );
};

export default TreeSelect;
