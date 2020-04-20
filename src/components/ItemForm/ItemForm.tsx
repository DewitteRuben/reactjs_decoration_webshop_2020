import React from "react";
import styled from "styled-components";
import MediaSelect from "../MediaSelect/MediaSelect";
import Button from "../Button/Button";
import data from "../TreeSelect/data.json";
import { Condition } from "../../io-ts-types";

import {
  InputCard,
  InputContainer,
  InputLabel,
  Seperator,
  FormInput,
  FormTextarea,
  FormTreeSelect,
  FormSelect,
  FormButtonContainer
} from "../FormBuilderComponents";

const ItemFormContainer = styled.form`
  display: flex;
  flex-direction: column;
`;

interface IItemFormProps {
  name: string;
  images: string[];
  description: string;
  categories: string;
  condition: string;
  price: number;
  submitLabel: string;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export interface IItemForm {
  name: string;
  images: File[];
  description: string;
  categories: string;
  condition: string;
  price: number;
}

const ItemForm: React.FC<Partial<IItemFormProps>> = ({
  name,
  images,
  description,
  categories,
  submitLabel,
  condition,
  price,
  onSubmit
}) => {
  const conditionValues = React.useMemo(() => Object.values(Condition), []);

  return (
    <ItemFormContainer onSubmit={onSubmit}>
      <InputCard>
        <InputContainer>
          <InputLabel htmlFor="name" as="label" fontWeight="extrabold" fontSize="large">
            Title
          </InputLabel>
          <FormInput required name="name" defaultValue={name} placeholder="For example 'Sturdy keramic vase'" id="name" />
        </InputContainer>
      </InputCard>
      <InputCard>
        <MediaSelect required name="images" defaultValue={images} />
      </InputCard>
      <InputCard>
        <InputContainer>
          <InputLabel htmlFor="description" as="label" fontWeight="extrabold" fontSize="large">
            Description
          </InputLabel>
          <FormTextarea
            defaultValue={description}
            placeholder="Describe the item you are selling"
            required
            name="description"
            as="textarea"
            id="description"
          />
        </InputContainer>
      </InputCard>
      <InputCard>
        <InputContainer>
          <InputLabel htmlFor="categories" as="label" fontWeight="extrabold" fontSize="large">
            Category
          </InputLabel>
          <FormTreeSelect
            defaultValue={categories}
            placeholder="Select a category"
            required
            id="category"
            name="categories"
            rootNode={data}
          />
        </InputContainer>
        <Seperator />
        <InputContainer>
          <InputLabel htmlFor="condition" as="label" fontWeight="extrabold" fontSize="large">
            Condition
          </InputLabel>
          <FormSelect
            defaultValue={condition}
            required
            id="condition"
            name="condition"
            placeholder="Select the condition of your item"
            data={conditionValues}
          />
        </InputContainer>
      </InputCard>
      <InputCard>
        <InputContainer>
          <InputLabel htmlFor="price" as="label" fontWeight="extrabold" fontSize="large">
            Price
          </InputLabel>
          <FormInput
            defaultValue={price}
            placeholder="Enter a price"
            required
            step="0.01"
            type="number"
            name="price"
            id="price"
          />
        </InputContainer>
      </InputCard>
      <FormButtonContainer>
        <Button type="submit">{submitLabel}</Button>
      </FormButtonContainer>
    </ItemFormContainer>
  );
};

export default ItemForm;
