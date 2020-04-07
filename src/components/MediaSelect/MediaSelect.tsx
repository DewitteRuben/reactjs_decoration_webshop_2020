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

const MediaSelect: React.FC<React.ComponentPropsWithRef<"input">> = React.forwardRef(({ ...props }, ref) => {
  const [media, setMedia] = React.useState<IMediaItem[]>([]);

  const onDrop = useCallback(files => {
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
    setMedia(prev => prev.filter(media => media.name !== name));
  };

  // Since we can't manipulate the FileList array, we will filter based on the image name
  const includedFiles = media.map(item => item.name);

  return (
    <MediaSelectContainer>
      <Dropzone {...getRootProps()}>
        <FileInput data-included={includedFiles} ref={ref} {...getInputProps()} {...props} />
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
