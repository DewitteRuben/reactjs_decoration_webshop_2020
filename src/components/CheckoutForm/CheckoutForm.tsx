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
import { serializeFormData } from "../../utils/forms";

interface ICheckoutFormProps {
  user: Omit<firebase.User, "phoneNumber" | "photoURL"> & Partial<IUser>;
  onSubmit?: (data: ICheckoutFormData) => void;
}

const CheckoutFormContainer = styled.form`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export interface ICheckoutFormData {
  city: string;
  country: string;
  firstName: string;
  lastName: string;
  postalCode: string;
  street: string;
}

const CheckoutForm: React.FC<ICheckoutFormProps> = ({ user, onSubmit }) => {
  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const serializedData = serializeFormData<ICheckoutFormData>(event.currentTarget);
    if (onSubmit) {
      onSubmit(serializedData as ICheckoutFormData);
    }
  };

  return (
    <CheckoutFormContainer onSubmit={handleOnSubmit}>
      <InputCard>
        <InputContainer>
          <InputLabel htmlFor="firstName" as="label" fontWeight="extrabold" fontSize="large">
            First name
          </InputLabel>
          <FormInput required defaultValue={user?.firstName} name="firstName" id="firstName" />
        </InputContainer>
        <Seperator />
        <InputContainer>
          <InputLabel htmlFor="lastName" as="label" fontWeight="extrabold" fontSize="large">
            Last name
          </InputLabel>
          <FormInput required defaultValue={user?.lastName} name="lastName" id="lastName" />
        </InputContainer>
      </InputCard>
      <InputCard>
        <InputContainer>
          <InputLabel htmlFor="street" as="label" fontWeight="extrabold" fontSize="large">
            Street Address
          </InputLabel>
          <FormInput required defaultValue={user?.address?.street} name="street" id="street" />
        </InputContainer>
        <Seperator />
        <InputContainer>
          <InputLabel htmlFor="city" as="label" fontWeight="extrabold" fontSize="large">
            City
          </InputLabel>
          <FormInput required defaultValue={user?.address?.city} name="city" id="city" />
        </InputContainer>
        <Seperator />
        <InputContainer>
          <InputLabel htmlFor="postalCode" as="label" fontWeight="extrabold" fontSize="large">
            Postal code
          </InputLabel>
          <FormInput required defaultValue={user?.address?.postalCode} name="postalCode" id="postalCode" />
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
            required
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
