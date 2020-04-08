import React from "react";
import styled from "styled-components";
import MediaSelect from "../MediaSelect/MediaSelect";
import Button from "../Button/Button";
import { serializeFormData } from "../../utils/forms";
import { useStores } from "../../hooks/use-stores";
import data from "../TreeSelect/data.json";
import { Condition, INewShopItem } from "../../io-ts-types";
import { addItem } from "../../api/api";
import { parseCategoryString } from "../../utils/string";
import { useHistory } from "react-router-dom";
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
import Typography from "../Typography/Typography";

const NewItemContainer = styled.form`
  display: flex;
  flex-direction: column;
  margin: 0 auto;

  width: 1140px;
`;

const Title = styled(Typography)`
  margin-bottom: 20px;
`;

interface INewItemForm {
  name: string;
  images: File[];
  description: string;
  categories: string;
  condition: string;
  price: number;
}

const NewItemForm: React.FC = () => {
  const { firebaseStore } = useStores();
  const history = useHistory();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { name, images, description, categories, condition, price } = serializeFormData<INewItemForm>(event.currentTarget);
    const token = await firebaseStore.getJWTToken();

    // if not logged in (no token) go to login page
    if (!token) {
      history.push("/login");
      return false;
    }

    if (images && name && categories && description && condition && price) {
      const imageURLs = await firebaseStore.uploadFiles(images);
      const parsedCondition: Condition = condition as Condition;
      const namedCategories = parseCategoryString(categories);

      const newShopitem: INewShopItem = {
        condition: parsedCondition,
        description,
        name,
        images: imageURLs,
        price,
        ...namedCategories
      };

      await addItem(newShopitem, token);
    }
  };

  const conditionValues = React.useMemo(() => Object.values(Condition), []);

  return (
    <NewItemContainer onSubmit={handleSubmit}>
      <Title fontSize="largest" fontWeight="bold" as="h2">
        Sell an item
      </Title>
      <InputCard>
        <InputContainer>
          <InputLabel htmlFor="name" as="label" fontWeight="extrabold" fontSize="large">
            Title
          </InputLabel>
          <FormInput required name="name" placeholder="For example 'Sturdy keramic vase'" id="name" />
        </InputContainer>
      </InputCard>
      <InputCard>
        <MediaSelect required name="images" />
      </InputCard>
      <InputCard>
        <InputContainer>
          <InputLabel htmlFor="description" as="label" fontWeight="extrabold" fontSize="large">
            Description
          </InputLabel>
          <FormTextarea
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
          <FormTreeSelect placeholder="Select a category" required id="category" name="categories" rootNode={data} />
        </InputContainer>
        <Seperator />
        <InputContainer>
          <InputLabel htmlFor="condition" as="label" fontWeight="extrabold" fontSize="large">
            Condition
          </InputLabel>
          <FormSelect
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
          <FormInput placeholder="Enter a price" required step="0.01" type="number" name="price" id="price" />
        </InputContainer>
      </InputCard>
      <FormButtonContainer>
        <Button type="submit">Save item</Button>
      </FormButtonContainer>
    </NewItemContainer>
  );
};

export default NewItemForm;
