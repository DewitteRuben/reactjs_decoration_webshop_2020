import React from "react";
import ItemForm, { IItemForm } from "../../components/ItemForm/ItemForm";

import { BackgroundContainer } from "../../components/FormBuilderComponents";
import styled from "styled-components";
import Typography from "../../components/Typography/Typography";
import { useStores } from "../../hooks/use-stores";
import { useHistory } from "react-router-dom";
import { serializeFormData } from "../../utils/forms";
import { Condition, INewShopItem } from "../../io-ts-types";
import { parseCategoryString } from "../../utils/string";
import { addItem } from "../../api/api";
import Container from "../../components/Container/Container";
import { useToasts } from "react-toast-notifications";
import { Information, Success } from "../../store/FirebaseStore";
import { getLocationFromShopItem } from "../../utils/navigation";

const NewItemContainer = styled(Container)`
  width: 1140px;
  flex-direction: column;
`;

const NewItem: React.FC = () => {
  const { firebaseStore } = useStores();
  const history = useHistory();
  const { addToast } = useToasts();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { name, images, description, categories, condition, price } = serializeFormData<IItemForm>(event.currentTarget);
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

      try {
        addToast(Information.ITEM_PROCESSING_ADD, { appearance: "info" });
        const resp = await addItem(newShopitem, token);
        const shopItem = (await resp.json()).storeItem;
        history.push(getLocationFromShopItem(shopItem));
        addToast(Success.ITEM_CREATE_SUCCESS, { appearance: "success" });
      } catch (error) {
        addToast(error.message, { appearance: "error" });
      }
    }
  };

  return (
    <BackgroundContainer>
      <NewItemContainer>
        <Typography type="title" fontSize="largest" fontWeight="bold" as="h2">
          Sell an item
        </Typography>
        <ItemForm submitLabel="Sell the item" onSubmit={handleSubmit} />
      </NewItemContainer>
    </BackgroundContainer>
  );
};

export default NewItem;
