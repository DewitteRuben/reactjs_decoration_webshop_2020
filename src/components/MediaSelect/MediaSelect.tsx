import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import _ from "lodash";
import PreviewImage from "./PreviewImage/PreviewImage";

interface IMediaItem extends Partial<File> {
  preview: string;
  preloaded?: boolean;
}

const MediaSelectContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const PreviewGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  margin-top: 10px;
`;

const Dropzone = styled.div`
  box-sizing: border-box;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  padding: 20px;
  border: 2px dotted ${props => props.theme.border};

  cursor: pointer;
`;

const FileInput = styled.input`
  display: initial !important;
  position: absolute;

  z-index: -1;
  opacity: 0;
`;

type MediaSelectProps = {
  defaultValue?: string[];
} & Omit<React.ComponentPropsWithRef<"input">, "defaultValue">;

export interface IMediaSelectHTMLElement extends HTMLInputElement {
  media: File[] | undefined;
}

const MediaSelect: React.FC<MediaSelectProps> = ({ defaultValue, required, ...props }) => {
  const [media, setMedia] = React.useState<IMediaItem[]>([]);

  const onDrop = useCallback(files => {
    const newFiles = files.map((file: File) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file)
      })
    );
    setMedia(prevMedia => _.uniqBy([...prevMedia, ...newFiles], "name"));
  }, []);

  const handleOnClose = (name: string) => {
    setMedia(prev => prev.filter(media => media.name !== name));
  };

  const { getRootProps, getInputProps, isDragActive, inputRef } = useDropzone({ onDrop, accept: "image/*" });

  React.useEffect(() => {
    if (defaultValue) {
      const parsedDefaultValue = defaultValue?.map(item => ({ name: item, preview: item, preloaded: true }));
      setMedia(prev => [...prev, ...parsedDefaultValue]);
    }
  }, [defaultValue]);

  React.useEffect(() => {
    return () => media.forEach((file: IMediaItem) => URL.revokeObjectURL(file.preview));
  });

  React.useEffect(() => {
    if (inputRef.current) {
      const input = inputRef.current as IMediaSelectHTMLElement;
      if (input?.media) {
        delete input.media;
      }

      const mediaWithDefaults = media.map(item => (item.preloaded ? item.preview : item));
      Object.defineProperty(input, "media", {
        value: mediaWithDefaults,
        writable: false,
        enumerable: true,
        configurable: true
      });
    }
  }, [inputRef, media]);

  return (
    <MediaSelectContainer>
      <Dropzone {...getRootProps()}>
        <FileInput {...props} ref={inputRef} {...getInputProps()} />
        {isDragActive ? <p>Drop the files here ...</p> : <p>Drag and drop images here, or click to select files</p>}
        {required && media.length === 0 && <FileInput type="file" multiple required />}
      </Dropzone>
      <PreviewGrid>
        {media.map(
          ({ name, preview }) =>
            name && preview && <PreviewImage key={name} src={preview} onClose={handleOnClose} name={name} />
        )}
      </PreviewGrid>
    </MediaSelectContainer>
  );
};

export default MediaSelect;
