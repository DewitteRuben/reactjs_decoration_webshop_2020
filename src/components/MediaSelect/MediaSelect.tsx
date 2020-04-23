import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import _ from "lodash";
import PreviewImage from "./PreviewImage/PreviewImage";

interface IMediaItem {
  name: string;
  src: string;
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

const MediaSelect: React.FC<MediaSelectProps> = React.forwardRef(({ defaultValue, required, ...props }, ref) => {
  const [media, setMedia] = React.useState<IMediaItem[]>([]);
  const [defaultImages, setDefaults] = React.useState<string[]>();

  React.useEffect(() => {
    if (defaultValue) {
      setDefaults(defaultValue);
      const parsedDefaultValue = defaultValue?.map(item => ({ name: item, src: item }));
      setMedia(prev => _.merge(prev, parsedDefaultValue));
    }
  }, [defaultValue]);

  const onDrop = useCallback(files => {
    setMedia([]);
    files.forEach((file: File) => {
      const reader = new FileReader();

      reader.onload = () => {
        setMedia(media => {
          const exists = _.find(media, ["name", file.name]);
          if (exists) return media;
          return [...media, { src: reader.result as string, name: file.name }];
        });
      };

      if (file) {
        reader.readAsDataURL(file);
      }
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: "image/*" });

  const handleOnClose = (name: string) => {
    if (defaultImages) {
      setDefaults(prev => prev?.filter(src => src !== name));
    }
    setMedia(prev => prev.filter(media => media.name !== name));
  };

  // Since we can't manipulate the FileList array, we will filter based on the image name
  const includedFiles = media.map(item => item.name);

  return (
    <MediaSelectContainer>
      <Dropzone {...getRootProps()}>
        <FileInput
          data-default={defaultImages}
          data-included={includedFiles}
          ref={ref}
          {...getInputProps()}
          required={(required && !defaultImages) || (required && defaultImages && defaultImages.length === 0)}
          {...props}
        />
        {isDragActive ? <p>Drop the files here ...</p> : <p>Drag and drop images here, or click to select files</p>}
      </Dropzone>
      <PreviewGrid>
        {media.map(({ name, src }) => (
          <PreviewImage key={name} src={src} onClose={handleOnClose} name={name} />
        ))}
      </PreviewGrid>
    </MediaSelectContainer>
  );
});

export default MediaSelect;
