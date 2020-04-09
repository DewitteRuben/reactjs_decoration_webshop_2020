import React from "react";
import Avatar, { getAvatarSize } from "../Avatar/Avatar";
import styled from "styled-components";
import Icon from "../Icon/Icon";
import Typography from "../Typography/Typography";
import { IUserStripped, IUserStrippedRuntime } from "../../io-ts-types";
import { useStores } from "../../hooks/use-stores";
import { isRight } from "fp-ts/lib/Either";
import { observer } from "mobx-react";
import Skeleton from "react-loading-skeleton";

const UserInfoCardContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;

  padding: 15px;
  min-width: 150px;
  max-height: 96px;

  border-radius: 20px;
  border: 1px solid ${props => props.theme.border};
`;

const TopContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 32px;
`;

const Username = styled(Typography)`
  display: inline-block;
  margin-left: 15px;
  width: 100%;
  height: 18px;
`;

const ActionContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 32px;
`;

interface IUserInfoCardProps extends React.ComponentPropsWithoutRef<"div"> {
  userId: string;
}

const UserInfoCard: React.FC<IUserInfoCardProps> = observer(({ userId }) => {
  const { firebaseStore } = useStores();
  const [userData, setUserData] = React.useState<IUserStripped>();

  React.useEffect(() => {
    async function fetchUser() {
      const response = await firebaseStore.getUserById(userId);
      const data = await response.json();
      if (isRight(IUserStrippedRuntime.decode(data))) {
        setUserData(data);
      }
    }

    fetchUser();
  }, [firebaseStore, userId]);

  return (
    <UserInfoCardContainer>
      <TopContainer>
        {userData ? (
          <Avatar imgURL={userData.photoURL} username={userData.username} size="small" />
        ) : (
          <Skeleton circle width={getAvatarSize("small")} height={getAvatarSize("small")} />
        )}
        <Username fontWeight="bold" fontSize="large">
          {userData ? userData.username : <Skeleton />}
        </Username>
      </TopContainer>
      <ActionContainer>
        <Icon size={32} name="add-user" />
        <Icon size={32} name="message" />
        <Icon size={32} name="user-profile" />
      </ActionContainer>
    </UserInfoCardContainer>
  );
});

export default UserInfoCard;
