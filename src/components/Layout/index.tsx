import styled from "styled-components";

const Spacer = styled.div`
  display: inline-block;
  min-width: 16px;
  width: 16px;
  height: 16px;
`;
const SpacerVertical = styled(Spacer)`
  height: 100%;
`;

export { Spacer, SpacerVertical };
