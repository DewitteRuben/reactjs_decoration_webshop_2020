import React from "react";
import styled, { css } from "styled-components";
import InputRegular from "../InputRegular/InputRegular";
import Typography from "../Typography/Typography";
import Card from "../Card/Card";
import MediaSelect from "../MediaSelect/MediaSelect";
import Button from "../Button/Button";
import { serializeFormData } from "../../utils/forms";
import { useStores } from "../../hooks/use-stores";
import TreeSelect from "../TreeSelect/TreeSelect";
import data from "../TreeSelect/data.json";
import { Condition, INewShopItem } from "../../io-ts-types";
import InputSelect from "../InputSelect/InputSelect";
import { addItem } from "../../api/api";
import { parseCategoryString } from "../../utils/string";
import { useHistory } from "react-router-dom";

const InputDimensionMixin = css`
  width: 60%;
  height: 44px;
`;

const StyledInput = styled(InputRegular)`
  ${InputDimensionMixin}
`;

const StyledTreeSelect = styled(TreeSelect)`
  ${InputDimensionMixin}
`;

const StyledSelect = styled(InputSelect)`
  ${InputDimensionMixin}
`;

const Textarea = styled(StyledInput)`
  height: 150px;
  resize: none;
  max-height: none;
`;

const Title = styled(Typography)`
  margin-bottom: 20px;
`;

const ItemInfoCard = styled(Card)`
  margin-bottom: 20px;
  border-radius: 4px;
`;

const NewItemContainer = styled.form`
  display: flex;
  flex-direction: column;
  margin: 0 auto;

  width: 1140px;
`;

const Label = styled(Typography)`
  display: block;
  margin-bottom: 8px;
  cursor: pointer;
  user-select: none;
`;

const InputContainer = styled.div`
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
`;

const Seperator = styled.hr`
  margin: 20px 0;
  height: 1px;
  background-color: ${props => props.theme.border};
  border: none;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
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
      <ItemInfoCard>
        <InputContainer>
          <Label htmlFor="name" as="label" fontWeight="extrabold" fontSize="large">
            Title
          </Label>
          <StyledInput required name="name" placeholder="For example 'Sturdy keramic vase'" id="name" />
        </InputContainer>
      </ItemInfoCard>
      <ItemInfoCard>
        <MediaSelect required name="images" />
      </ItemInfoCard>
      <ItemInfoCard>
        <InputContainer>
          <Label htmlFor="description" as="label" fontWeight="extrabold" fontSize="large">
            Description
          </Label>
          <Textarea
            placeholder="Describe the item you are selling"
            required
            name="description"
            as="textarea"
            id="description"
          />
        </InputContainer>
      </ItemInfoCard>
      <ItemInfoCard>
        <InputContainer>
          <Label htmlFor="categories" as="label" fontWeight="extrabold" fontSize="large">
            Category
          </Label>
          <StyledTreeSelect placeholder="Select a category" required id="category" name="categories" rootNode={data} />
        </InputContainer>
        <Seperator />
        <InputContainer>
          <Label htmlFor="condition" as="label" fontWeight="extrabold" fontSize="large">
            Condition
          </Label>
          <StyledSelect
            required
            id="condition"
            name="condition"
            placeholder="Select the condition of your item"
            data={conditionValues}
          />
        </InputContainer>
      </ItemInfoCard>
      <ItemInfoCard>
        <InputContainer>
          <Label htmlFor="price" as="label" fontWeight="extrabold" fontSize="large">
            Price
          </Label>
          <StyledInput placeholder="Enter a price" required step="0.01" type="number" name="price" id="price" />
        </InputContainer>
      </ItemInfoCard>
      <ButtonContainer>
        <Button type="submit">Save item</Button>
      </ButtonContainer>
    </NewItemContainer>
  );
};

export default NewItemForm;
