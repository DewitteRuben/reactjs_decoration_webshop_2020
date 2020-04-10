import React from "react";
import styled from "styled-components";
import { IUserStripped, IUserStrippedRuntime } from "../../io-ts-types";
import { getPartialUserById } from "../../api/api";
import { isRight } from "fp-ts/lib/Either";
import Avatar from "../Avatar/Avatar";
import Skeleton from "react-loading-skeleton";
import Typography from "../Typography/Typography";
import _ from "lodash";
import { Spacer } from "../Layout";

const UserInfoSidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  height: 600px;
  box-shadow: 0px 0px 2px rgba(17, 17, 17, 0.24);
`;

const AvatarContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 250px;
  border-radius: 4px;
  height: 200px;
`;

const UserInfoHeading = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  margin-top: 10px;
  padding: 0 20px;
`;

interface IUserInfoSidebarProps {
  userId: string;
}

const UserInfoSidebar: React.FC<IUserInfoSidebarProps> = ({ userId }) => {
  const [user, setUserData] = React.useState<IUserStripped>();

  React.useEffect(() => {
    async function fetchUser() {
      const resp = await getPartialUserById(userId);
      const data = await resp.json();
      if (isRight(IUserStrippedRuntime.decode(data))) {
        setUserData(data);
      }
    }

    fetchUser();
  }, [userId]);

  return (
    <UserInfoSidebarContainer>
      <AvatarContainer>
        {user ? (
          <Avatar size="largest" imgURL={user?.photoURL} username={user.username} />
        ) : (
          <Skeleton circle width={160} height={160} />
        )}
      </AvatarContainer>
      <Spacer />
      <Typography align="center" fontWeight="bold" fontSize="larger">
        {user ? user.username : <Skeleton width={150} />}
      </Typography>
      <UserInfoHeading>
        <Typography color="darkGray" fontSize="small">
          {user ? user?.gender && "User info:" : <Skeleton />}
        </Typography>
        <Typography>{user ? user?.gender && `${_.capitalize(user?.gender)}` : <Skeleton />}</Typography>
      </UserInfoHeading>
    </UserInfoSidebarContainer>
  );
};

export default UserInfoSidebar;
