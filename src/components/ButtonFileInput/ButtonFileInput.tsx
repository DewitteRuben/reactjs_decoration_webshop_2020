import React from "react";
import Button from "../Button/Button";
import styled from "styled-components";

const HiddenInput = styled.input`
  display: none;
`;

const Container = styled.div``;

interface IButtonFileInputProps extends React.ComponentPropsWithoutRef<"input"> {
  onFileSelect?: (data: string) => void;
}

const ButtonFileInput: React.FC<IButtonFileInputProps> = ({ children, className, style, onFileSelect, ...props }) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleOnClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    const file = fileList?.item(0);
    const isSVG = file?.type === "image/svg+xml";
    if (file) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        if (onFileSelect) {
          const result: string = isSVG
            ? "data:image/svg+xml;base64," + btoa(reader.result as string)
            : (reader.result as string);
          onFileSelect(result);
        }
      });
      if (isSVG) {
        reader.readAsText(file);
      } else {
        reader.readAsDataURL(file);
      }
    }
  };

  return (
    <Container>
      <HiddenInput onChange={handleOnChange} ref={inputRef} type="file" {...props} />
      <Button type="button" style={style} className={className} onClick={handleOnClick}>
        {children}
      </Button>
    </Container>
  );
};

export default ButtonFileInput;
