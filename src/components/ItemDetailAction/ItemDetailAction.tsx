import React from "react";
import styled from "styled-components";
import IconWithLabel from "../IconWithLabel/IconWithLabel";
import IconLink from "../IconLink/IconLink";
import { useStores } from "../../hooks/use-stores";
import Skeleton from "react-loading-skeleton";
import { observer } from "mobx-react";
import { Link, useHistory } from "react-router-dom";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";
import { useToasts } from "react-toast-notifications";
import { Success, Information } from "../../store/FirebaseStore";

const UserInfoCardContainer = styled.div`
  padding: 15px;
  min-width: 150px;
  max-height: 96px;

  border-radius: 20px;
  border: 1px solid ${props => props.theme.border};

  display: flex;
  justify-content: space-around;
`;

interface IItemDetailActionProps {
  userId: string;
  itemId: string;
}

const ItemDetailAction: React.FC<IItemDetailActionProps> = observer(({ userId, itemId }) => {
  const { addToast } = useToasts();
  const history = useHistory();

  const [open, setOpen] = React.useState(false);
  const { firebaseStore } = useStores();
  const loaded = firebaseStore.authStatus.loaded;
  const isLoggedIn = firebaseStore.isLoggedIn;
  const user = firebaseStore.currentUser;

  if ((loaded && !isLoggedIn) || user?.userId !== userId) {
    return null;
  }

  const handleOnDelete = () => {
    setOpen(true);
  };

  const handleOnConfirm = async () => {
    setOpen(false);

    try {
      addToast(Information.ITEM_PROCESSING_DELETE, { appearance: "info" });
      await firebaseStore.deleteItemById(itemId);

      history.push(`/user/${userId}`);

      addToast(Success.ITEM_DELETE_SUCCESS, { appearance: "success" });
    } catch (error) {
      addToast(error.message, { appearance: "error" });
    }
  };

  const handleOnCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <UserInfoCardContainer>
        {loaded ? (
          <>
            <IconLink to={`/edit/${itemId}`} as={Link}>
              <IconWithLabel name="edit">Edit</IconWithLabel>
            </IconLink>
            <IconLink onClick={handleOnDelete}>
              <IconWithLabel name="delete">Delete</IconWithLabel>
            </IconLink>
          </>
        ) : (
          <>
            <Skeleton height={28} width={60} />
            <Skeleton height={28} width={60} />
          </>
        )}
      </UserInfoCardContainer>
      <ConfirmationModal
        message="Do you really want to delete the item?"
        onCancel={handleOnCancel}
        onConfirm={handleOnConfirm}
        onRequestClose={handleOnCancel}
        isOpen={open}
        title="Delete item"
      />
    </>
  );
});

export default ItemDetailAction;
