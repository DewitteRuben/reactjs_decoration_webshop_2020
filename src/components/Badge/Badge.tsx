import styled from "styled-components";

const Badge = styled.div`
  box-sizing: border-box;

  position: absolute;
  top: 0;
  right: 0;
  z-index: 30;

  display: flex;
  justify-content: center;
  align-items: center;

  min-width: 20px;
  height: 20px;
  padding: 0 6px;

  font-weight: bold;
  font-size: 0.75rem;

  border-radius: 10px;

  color: ${props => props.theme.white};
  background-color: ${props => props.theme.darkGray};

  user-select: none;
  pointer-events: none;
`;

export default Badge;
