import React from "react";
import styled from "styled-components";
import {
  InputCard,
  InputContainer,
  InputLabel,
  FormInput,
  Seperator,
  FormSelect,
  FormButtonContainer
} from "../FormBuilderComponents";
import Button from "../Button/Button";
import countries from "../../data/countries.json";
import { IUser } from "../../io-ts-types";

interface ICheckoutFormProps {
  user: Omit<firebase.User, "phoneNumber" | "photoURL"> & Partial<IUser>;
}

const CheckoutFormContainer = styled.form`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const CheckoutForm: React.FC<ICheckoutFormProps> = ({ user }) => {
  return (
    <CheckoutFormContainer>
      <InputCard>
        <InputContainer>
          <InputLabel htmlFor="firstName" as="label" fontWeight="extrabold" fontSize="large">
            First name
          </InputLabel>
          <FormInput defaultValue={user?.firstName} name="firstName" id="firstName" />
        </InputContainer>
        <Seperator />
        <InputContainer>
          <InputLabel htmlFor="lastName" as="label" fontWeight="extrabold" fontSize="large">
            Last name
          </InputLabel>
          <FormInput defaultValue={user?.lastName} name="lastName" id="lastName" />
        </InputContainer>
      </InputCard>
      <InputCard>
        <InputContainer>
          <InputLabel htmlFor="street" as="label" fontWeight="extrabold" fontSize="large">
            Street Address
          </InputLabel>
          <FormInput defaultValue={user?.address?.street} name="street" id="street" />
        </InputContainer>
        <Seperator />
        <InputContainer>
          <InputLabel htmlFor="city" as="label" fontWeight="extrabold" fontSize="large">
            City
          </InputLabel>
          <FormInput defaultValue={user?.address?.city} name="city" id="city" />
        </InputContainer>
        <Seperator />
        <InputContainer>
          <InputLabel htmlFor="postalCode" as="label" fontWeight="extrabold" fontSize="large">
            Postal code
          </InputLabel>
          <FormInput defaultValue={user?.address?.postalCode} name="postalCode" id="postalCode" />
        </InputContainer>
        <Seperator />
        <InputContainer>
          <InputLabel htmlFor="country" as="label" fontWeight="extrabold" fontSize="large">
            Country
          </InputLabel>
          <FormSelect
            data={countries}
            placeholder="Select your country"
            defaultValue={user?.address?.country || ""}
            name="country"
            id="country"
          />
        </InputContainer>
      </InputCard>
      <FormButtonContainer>
        <Button>Continue to payment</Button>
      </FormButtonContainer>
    </CheckoutFormContainer>
  );
};

export default CheckoutForm;
