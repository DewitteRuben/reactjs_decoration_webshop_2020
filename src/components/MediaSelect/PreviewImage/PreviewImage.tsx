import styled from "styled-components";
import React from "react";
import { getFontWeight } from "../../Typography/Typography";

const PreviewImageContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  width: 100%;
  min-height: 160px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  font-weight: ${getFontWeight("bold")};
`;

interface IPreviewImageProps {
  src: string;
  name: string;
  onClose?: (name: string) => void;
}

const PreviewImage: React.FC<IPreviewImageProps> = ({ src, name, onClose, ...props }) => {
  const handleOnClose = () => {
    if (onClose) {
      onClose(name);
    }
  };

  return (
    <PreviewImageContainer>
      <Image src={src} alt={name} {...props} />
      <CloseButton onClick={handleOnClose}>x</CloseButton>
    </PreviewImageContainer>
  );
};

export default PreviewImage;
