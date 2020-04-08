import styled, { css } from "styled-components";
import InputRegular from "../InputRegular/InputRegular";
import TreeSelect from "../TreeSelect/TreeSelect";
import InputSelect from "../InputSelect/InputSelect";
import Typography from "../Typography/Typography";
import Card from "../Card/Card";

export const InputDimensionMixin = css`
  width: 60%;
  height: 44px;
`;

export const FormInput = styled(InputRegular)`
  ${InputDimensionMixin}
`;

export const FormTreeSelect = styled(TreeSelect)`
  ${InputDimensionMixin}
`;

export const FormSelect = styled(InputSelect)`
  ${InputDimensionMixin}
`;

export const FormTextarea = styled(FormInput)`
  height: 150px;
  resize: none;
  max-height: none;
`;

export const InputCard = styled(Card)`
  margin-bottom: 20px;
  border-radius: 4px;
`;
export const InputLabel = styled(Typography)`
  display: block;
  margin-bottom: 8px;
  cursor: pointer;
  user-select: none;
`;

export const InputContainer = styled.div`
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
`;

export const Seperator = styled.hr`
  margin: 20px 0;
  height: 1px;
  background-color: ${props => props.theme.border};
  border: none;
`;

export const FormButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const BackgroundContainer = styled.div`
  padding-top: 25px;
  background-color: ${props => props.theme.gray};
  min-height: 100%;
`;
