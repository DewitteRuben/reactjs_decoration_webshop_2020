import React from "react";
import { IUser, Gender } from "../../io-ts-types";
import styled from "styled-components";
import {
  InputCard,
  InputContainer,
  InputLabel,
  Seperator,
  FormInput,
  FormSelect,
  FormButtonContainer
} from "../FormBuilderComponents";
import Avatar from "../Avatar/Avatar";
import Button from "../Button/Button";
import countries from "../../data/countries.json";
import { serializeFormData, deepDiffObj } from "../../utils/forms";
import _ from "lodash";
import { useStores } from "../../hooks/use-stores";
import moment from "moment";
import ButtonFileInput from "../ButtonFileInput/ButtonFileInput";
import { useToasts } from "react-toast-notifications";
import { Information, Success } from "../../store/FirebaseStore";

interface IUserActionCardProps {
  user: Omit<firebase.User, "phoneNumber" | "photoURL"> & Partial<IUser>;
}

const FileInput = styled(ButtonFileInput)`
  height: 50px;
`;

const ProfileCardContainer = styled.form`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-bottom: 30px;
`;

const replaceWithEmptyString = (val: string | undefined | null) => (val === undefined || val === null ? "" : val);

interface IUserProfileForm {
  username: string;
  emailAddress: string;
  firstName: string;
  lastName: string;
  gender: string;
  birthdate: string;
  phoneNumber: string;
  street: string;
  postalCode: string;
  city: string;
  country: string;
  photoURL: File[];
}

const keyLabelMap: Record<string, string> = {
  username: "Username",
  firstName: "First name",
  lastName: "Last name",
  gender: "Gender",
  birthdate: "Birth date",
  phoneNumber: "Phone number",
  address: "Address information",
  photoURL: "Profile picture"
};

const ProfileUserDataForm: React.FC<IUserActionCardProps> = ({ user }) => {
  const { username, emailAddress, firstName, lastName, gender, birthdate, phoneNumber, address, photoURL } = user;
  const [imgPreviewData, setImgPreviewData] = React.useState("");
  const { firebaseStore } = useStores();
  const { addToast } = useToasts();

  const initialData = _.mapValues(
    {
      username,
      firstName,
      lastName,
      gender,
      birthdate,
      phoneNumber,
      photoURL: [],
      address: _.mapValues(
        {
          street: address?.street,
          postalCode: address?.postalCode,
          city: address?.city,
          country: address?.country
        },
        replaceWithEmptyString
      )
    },
    replaceWithEmptyString
  );

  const initialDataRef = React.useRef(_.cloneDeep(initialData));

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const serializedFormData = serializeFormData<IUserProfileForm>(event.currentTarget) as IUserProfileForm;

    const { street, postalCode, city, country, emailAddress, ...rest } = serializedFormData;

    const nestedAddressFormData = { ...rest, address: { street, postalCode, city, country } };

    const diff = deepDiffObj(initialDataRef.current, nestedAddressFormData);
    if (diff.photoURL && diff.photoURL.length > 0) {
      const uploadedUrls = await firebaseStore.uploadFiles(diff.photoURL);
      diff.photoURL = uploadedUrls;
    }

    if (_.isEmpty(diff)) {
      return addToast(Information.PROFILE_NO_CHANGES, { appearance: "info" });
    }

    try {
      const items = Object.keys(diff).map(item => keyLabelMap[item]);
      addToast(`${Information.PROFILE_PROCESSING_CHANGES} ${items.join(",")}`, { appearance: "info" });
      await firebaseStore.updateUserData(diff);
      addToast(Success.PROFILE_UPDATE_SUCCESS, { appearance: "success" });

      initialDataRef.current = { ...initialDataRef.current, ...diff };
    } catch (error) {
      addToast(error.message, { appearance: "error" });
    }
  };

  return (
    <ProfileCardContainer onSubmit={handleFormSubmit}>
      <InputCard>
        <InputContainer>
          <InputLabel htmlFor="username" as="label" fontWeight="extrabold" fontSize="large">
            Your photo
          </InputLabel>
          <Avatar
            size="large"
            imgURL={imgPreviewData || photoURL}
            username={user.firstName || user.username || user.emailAddress}
          />
          <FileInput onFileSelect={setImgPreviewData} accept="image/*" name="photoURL">
            Change photo
          </FileInput>
        </InputContainer>
      </InputCard>
      <InputCard>
        <InputContainer>
          <InputLabel htmlFor="username" as="label" fontWeight="extrabold" fontSize="large">
            Username
          </InputLabel>
          <FormInput defaultValue={username} name="username" id="username" />
        </InputContainer>
        <Seperator />
        <InputContainer>
          <InputLabel htmlFor="emailAddress" as="label" fontWeight="extrabold" fontSize="large">
            Email Address
          </InputLabel>
          <FormInput disabled defaultValue={emailAddress} name="emailAddress" id="emailAddress" />
        </InputContainer>
      </InputCard>
      <InputCard>
        <InputContainer>
          <InputLabel htmlFor="firstName" as="label" fontWeight="extrabold" fontSize="large">
            First name
          </InputLabel>
          <FormInput defaultValue={firstName} name="firstName" id="firstName" />
        </InputContainer>
        <Seperator />
        <InputContainer>
          <InputLabel htmlFor="lastName" as="label" fontWeight="extrabold" fontSize="large">
            Last name
          </InputLabel>
          <FormInput defaultValue={lastName} name="lastName" id="lastName" />
        </InputContainer>
        <Seperator />
        <InputContainer>
          <InputLabel htmlFor="gender" as="label" fontWeight="extrabold" fontSize="large">
            Gender
          </InputLabel>
          <FormSelect
            defaultValue={gender}
            placeholder="Select your gender"
            data={Object.values(Gender)}
            name="gender"
            id="gender"
          />
        </InputContainer>
        <Seperator />
        <InputContainer>
          <InputLabel htmlFor="birthdate" as="label" fontWeight="extrabold" fontSize="large">
            Birthday
          </InputLabel>
          <FormInput type="date" defaultValue={moment(birthdate).format("YYYY-MM-DD")} name="birthdate" id="birthdate" />
        </InputContainer>
        <Seperator />
        <InputContainer>
          <InputLabel htmlFor="phoneNumber" as="label" fontWeight="extrabold" fontSize="large">
            Phone number
          </InputLabel>
          <FormInput type="tel" defaultValue={phoneNumber} name="phoneNumber" id="phoneNumber" />
        </InputContainer>
      </InputCard>
      <InputCard>
        <InputContainer>
          <InputLabel htmlFor="street" as="label" fontWeight="extrabold" fontSize="large">
            Street Address
          </InputLabel>
          <FormInput defaultValue={address?.street} name="street" id="street" />
        </InputContainer>
        <Seperator />
        <InputContainer>
          <InputLabel htmlFor="city" as="label" fontWeight="extrabold" fontSize="large">
            City
          </InputLabel>
          <FormInput defaultValue={address?.city} name="city" id="city" />
        </InputContainer>
        <Seperator />
        <InputContainer>
          <InputLabel htmlFor="postalCode" as="label" fontWeight="extrabold" fontSize="large">
            Postal code
          </InputLabel>
          <FormInput defaultValue={address?.postalCode} name="postalCode" id="postalCode" />
        </InputContainer>
        <Seperator />
        <InputContainer>
          <InputLabel htmlFor="country" as="label" fontWeight="extrabold" fontSize="large">
            Country
          </InputLabel>
          <FormSelect
            data={countries}
            placeholder="Select your country"
            defaultValue={address?.country || ""}
            name="country"
            id="country"
          />
        </InputContainer>
      </InputCard>
      <FormButtonContainer>
        <Button type="submit">Update profile</Button>
      </FormButtonContainer>
    </ProfileCardContainer>
  );
};

export default ProfileUserDataForm;
