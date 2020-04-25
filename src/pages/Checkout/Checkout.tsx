import React from "react";
import { useStores } from "../../hooks/use-stores";
import Container from "../../components/Container/Container";
import { observer } from "mobx-react";
import styled from "styled-components";
import { BackgroundContainer } from "../../components/FormBuilderComponents";
import { Redirect, useHistory } from "react-router-dom";
import { SpacerVertical, Spacer } from "../../components/Layout";
import Typography from "../../components/Typography/Typography";
import CheckoutForm, { ICheckoutFormData } from "../../components/CheckoutForm/CheckoutForm";
import CheckoutCart from "../../components/CheckoutCart/CheckoutCart";
import ButtonPaypalCheckout, { ICustomerData } from "../../components/ButtonPaypalCheckout/ButtonPaypalCheckout";
import { useToasts } from "react-toast-notifications";
import { Success } from "../../store/FirebaseStore";

const CheckoutContainer = styled(Container)`
  width: 1140px;
  flex-direction: column;
`;

const MainContainer = styled.div`
  display: flex;
  width: 100%;
`;

const PaymentContainer = styled.div`
  display: flex;
  width: 100%;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
`;

const Checkout: React.FC = observer(() => {
  const { firebaseStore, cartStore } = useStores();
  const { addToast } = useToasts();
  const history = useHistory();
  const [addresInformation, setInformation] = React.useState<ICustomerData>();
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

  const handleSubmit = (data: ICheckoutFormData) => {
    const { firstName, lastName, city, country, postalCode, street } = data;
    const customerData: ICustomerData = {
      firstName,
      lastName,
      items: cartStore.items.map(({ name, price }) => ({ name, price })),
      address: {
        street,
        city,
        countryCode: country,
        postCode: postalCode
      }
    };
    setInformation(customerData);
  };

  const handleOnApprove = (details: any) => {
    cartStore.clear();
    history.push("/");
    addToast(Success.PAYMENT_SUCCESS, { appearance: "success" });
  };

  return (
    <BackgroundContainer>
      <CheckoutContainer>
        <Header>
          <Typography fontWeight="bold" fontSize="larger">
            {addresInformation ? "Payment method" : "Delivery address"}
          </Typography>
        </Header>
        <Spacer />
        {addresInformation ? (
          <PaymentContainer>
            <ButtonPaypalCheckout onApprove={handleOnApprove} data={addresInformation} />
            <SpacerVertical />
            <CheckoutCart />
          </PaymentContainer>
        ) : (
          <MainContainer>
            <CheckoutForm onSubmit={handleSubmit} user={user} />
            <SpacerVertical />
            <CheckoutCart />
          </MainContainer>
        )}
      </CheckoutContainer>
    </BackgroundContainer>
  );
});

export default Checkout;
