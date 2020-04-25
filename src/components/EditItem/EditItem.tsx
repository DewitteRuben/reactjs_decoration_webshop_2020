import React from "react";
import ItemForm, { IItemForm } from "../ItemForm/ItemForm";
import { useStores } from "../../hooks/use-stores";
import { IShopItem } from "../../io-ts-types";
import { getItemById } from "../../api/api";
import { useParams, Redirect } from "react-router-dom";
import { observer } from "mobx-react";
import Container from "../Container/Container";
import styled from "styled-components";
import Typography from "../Typography/Typography";
import { serializeFormData, deepDiffObj } from "../../utils/forms";
import { parseCategoryString } from "../../utils/string";
import { useToasts } from "react-toast-notifications";
import { Success, Information } from "../../store/FirebaseStore";
import _ from "lodash";
import RouterLink from "../Link/RouterLink/RouterLink";
import { getLocationFromShopItem } from "../../utils/navigation";
import FullPageSpinner from "../FullPageSpinner/FullPageSpinner";

const EditItemContainer = styled(Container)`
  flex-direction: column;
  width: 1140px;
`;

const EditItem = observer(() => {
  const { id } = useParams();
  const { firebaseStore } = useStores();
  const [item, setItem] = React.useState<IShopItem>();
  const { addToast } = useToasts();

  const { name, description, price, category, subCategory, specificCategory, itemCategory, condition, images } = item || {};

  const parsedCategories = React.useMemo(
    () => ["categories", category, subCategory, specificCategory, itemCategory].join(","),
    [category, itemCategory, specificCategory, subCategory]
  );

  const parsedImages = React.useMemo(() => images?.map(image => image.full), [images]);

  React.useEffect(() => {
    async function fetchItem() {
      if (id) {
        const item = await (await getItemById(id)).json();
        setItem(item);
      }
    }

    fetchItem();
  }, [id]);

  if (!item) {
    return null;
  }

  if (!firebaseStore.authStatus.loaded) {
    return <FullPageSpinner />;
  }

  if (firebaseStore.authStatus.loaded && firebaseStore.isLoggedIn) {
    if (item.userId !== firebaseStore.currentUser?.userId) {
      return <Redirect to="/" />;
    }
  }

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { images: formImages, categories, ...formInputs } = serializeFormData<IItemForm>(event.currentTarget);
    const { _id, id, wishlists, createdAt, updatedAt, userId, images, ...itemValues } = item;
    const parsedItemImages = images.map(image => image.full);
    const parsedFormCategories = categories ? parseCategoryString(categories) : {};
    const strippedItem = { ...itemValues, images: parsedItemImages };
    const formItem = { ...formInputs, images: formImages, ...parsedFormCategories };

    const updates = deepDiffObj(strippedItem, formItem);
    if (updates.images) {
      const blobs = updates.images.filter((image: any) => image instanceof File);
      const urls = updates.images.filter((image: any) => typeof image === "string");
      const updatedImages = await firebaseStore.uploadFiles(blobs);
      updates.images = [...urls, ...updatedImages];
    }

    if (_.isEmpty(updates)) {
      return addToast(Information.ITEM_NO_CHANGES, { appearance: "info" });
    }

    try {
      addToast(Information.ITEM_PROCESSING_EDIT, { appearance: "info" });
      setItem(prev => ({ ...prev, ...updates }));
      await firebaseStore.updateItemById(id, updates);
      addToast(Success.ITEM_UPDATE_SUCCESS, { appearance: "success" });
    } catch (error) {
      addToast(error.message, { appearance: "error" });
    }
  };

  return (
    <EditItemContainer>
      <Typography type="title" fontWeight="bold" fontSize="larger">
        Editing item:{" "}
        {
          <RouterLink to={getLocationFromShopItem(item)}>
            {
              <Typography type="title" fontWeight="bold" fontSize="larger">
                {name}
              </Typography>
            }
          </RouterLink>
        }
      </Typography>
      <ItemForm
        onSubmit={onSubmit}
        submitLabel="Save changes"
        description={description}
        condition={condition}
        price={price}
        images={parsedImages}
        name={name}
        categories={parsedCategories}
      />
    </EditItemContainer>
  );
});

export default EditItem;
