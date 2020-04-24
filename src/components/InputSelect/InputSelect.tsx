import React from "react";
import InputRegular from "../InputRegular/InputRegular";
import _ from "lodash";
import styled, { css } from "styled-components";
import { rgba } from "polished";

interface ISelect {
  togglePlaceholder: boolean;
}

const PlaceholderColorMixin = css`
  color: ${props => rgba(props.theme.placeholder, 0.5)};
`;

const Select = styled(InputRegular)<ISelect>`
  ${props => props.togglePlaceholder && PlaceholderColorMixin}

  &:hover {
    cursor: pointer;
  }

  &:focus {
    color: ${props => props.theme.black};
  }
`;

const PlaceholderOption = styled.option``;

export interface IKeyValuePair {
  key: string;
  value: string;
}

interface IInputSelectProps extends Omit<React.ComponentPropsWithoutRef<"select">, "onChange"> {
  data: (IKeyValuePair | string)[];
  placeholder?: string;
  capitalizeValue?: boolean;
  onChange?: (key: string) => void;
}

const InputSelect: React.FC<IInputSelectProps> = ({
  placeholder,
  data,
  capitalizeValue = true,
  onChange,
  defaultValue,
  ...props
}) => {
  const [value, setValue] = React.useState("");

  const handleOnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (onChange) {
      onChange(event.target.value);
    }
    setValue(event.target.value);
  };

  return (
    <Select
      {...props}
      togglePlaceholder={!defaultValue?.toString().length && !value.length}
      defaultValue={defaultValue || ""}
      onChange={handleOnChange}
      as="select"
    >
      <PlaceholderOption hidden value="">
        {placeholder}
      </PlaceholderOption>
      {data.map((item: string | IKeyValuePair) => {
        const value = typeof item === "string" ? item : item.value;
        const key = typeof item === "string" ? item : item.key;
        return (
          <option value={key} key={key}>
            {capitalizeValue ? _.capitalize(value) : value}
          </option>
        );
      })}
    </Select>
  );
};

export default InputSelect;
