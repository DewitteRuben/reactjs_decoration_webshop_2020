import styled from "styled-components";

export default styled.a`
  text-decoration: none;
  color: ${props => props.theme.black};

  &:hover {
    border-bottom: 1px solid ${props => props.theme.black};
  }
`;
