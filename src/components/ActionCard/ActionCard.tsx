import React from "react";
import styled from "styled-components";
import Card from "../Card/Card";
import Typography from "../Typography/Typography";

const ProfileCard = styled(Card)`
  padding: 0;
  width: 1080px;
  display: flex;
  flex-direction: column;
`;

const Actionbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  height: 100%;
  width: 100%;
  padding: 25px 40px;
  box-sizing: border-box;

  border-bottom: 1px solid ${props => props.theme.darkBorder};
`;

const InformationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 40px;
`;

interface IActionCardProps {
  actionComponent?: React.ReactNode;
  title: string;
}

const ActionCard: React.FC<IActionCardProps> = ({ title, actionComponent, children }) => {
  return (
    <ProfileCard>
      <Actionbar>
        <Typography fontSize="larger" fontWeight="bold">
          {title}
        </Typography>
        {actionComponent && actionComponent}
      </Actionbar>
      <InformationContainer>{children}</InformationContainer>
    </ProfileCard>
  );
};

export default ActionCard;
