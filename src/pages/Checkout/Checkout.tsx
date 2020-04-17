import React from "react";
import { useStores } from "../../hooks/use-stores";
import Container from "../../components/Container/Container";
import { observer } from "mobx-react";
import styled from "styled-components";
import { BackgroundContainer } from "../../components/FormBuilderComponents";
import { Redirect } from "react-router-dom";
import { SpacerVertical, Spacer } from "../../components/Layout";
import Typography from "../../components/Typography/Typography";
import CheckoutForm from "../../components/CheckoutForm/CheckoutForm";
import CheckoutCart from "../../components/CheckoutCart/CheckoutCart";

const CheckoutContainer = styled(Container)`
  width: 1140px;
  flex-direction: column;
`;

const MainContainer = styled.div`
  display: flex;
  width: 100%;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
`;

const Checkout: React.FC = observer(() => {
  const { firebaseStore } = useStores();
  const user = firebaseStore.currentUser;

  // TODO: proper loading handling
  if (!firebaseStore.authStatus.loaded) {
    return <p>Loading...</p>;
  }

  if (firebaseStore.authStatus.error) {
    return <p>{firebaseStore.authStatus.error.message}</p>;
  }

  if (!firebaseStore.isLoggedIn || !user) {
    return <Redirect to="/" />;
  }

  return (
    <BackgroundContainer>
      <CheckoutContainer>
        <Header>
          <Typography fontWeight="bold" fontSize="larger">
            Delivery address
          </Typography>
        </Header>
        <Spacer />
        <MainContainer>
          <CheckoutForm user={user} />
          <SpacerVertical />
          <CheckoutCart />
        </MainContainer>
      </CheckoutContainer>
    </BackgroundContainer>
  );
});

export default Checkout;
