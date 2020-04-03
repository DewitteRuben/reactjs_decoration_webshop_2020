import styled from "styled-components";
import Typography from "../Typography/Typography";
import React from "react";

const ProfileInfo = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;
`;

const ProfileInfoListItem = styled(Typography)`
  margin-top: 15px;
`;

interface IProfileUserInfoProps {
  user: firebase.User | null;
}

const ProfileUserInfo: React.FC<IProfileUserInfoProps> = ({ user }) => {
  const { uid, displayName, email, phoneNumber } = { ...user };

  return (
    <ProfileInfo>
      <ProfileInfoListItem as="li" fontSize="large">
        User ID: {uid}
      </ProfileInfoListItem>
      {displayName && (
        <ProfileInfoListItem as="li" fontSize="large">
          Username: {displayName}
        </ProfileInfoListItem>
      )}
      <ProfileInfoListItem as="li" fontSize="large">
        Email address: {email}
      </ProfileInfoListItem>
      {phoneNumber && (
        <ProfileInfoListItem as="li" fontSize="large">
          Phone number: {phoneNumber}
        </ProfileInfoListItem>
      )}
    </ProfileInfo>
  );
};

export default ProfileUserInfo;
