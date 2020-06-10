import React, { useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
// prettier-ignore
import {
  Box, Boxfc, Boxf, BoxPaper, Hidden,  Content,BoxProps,Chip,
  BoxCont, BoxVert, BoxHori, TextField,
  H4, H1, H3, H2,Txt,
  Button,Touchable, Switch, Divider,Avatar,
} from "../MaterialUI";
import { print } from "../utils";

let i = 0;
function getImageB64(image: File):Promise<string> {
  return new Promise((resolve) => {
    if (!image.type.startsWith("image/")) throw `incorrect image`;
    var reader = new FileReader();
    reader.onload = function(event) {
      const b64Image = event.target?.result;
      if (!b64Image) throw `incorrect image`;
      const img = typeof b64Image == "string" ? b64Image : new TextDecoder("utf-8").decode(b64Image);
      resolve(img.split(',')[1]);
    };
    reader.readAsDataURL(image);
  });
}

export const DragAndDropImage = ({
  onReceiveImage,
}: {
  onReceiveImage: (b64image: Promise<string>, name:string) => void;
}) => {
  useEffect(() => {
    document.onpaste = async function(event) {
      if (!event || !event.clipboardData) return;
      var items = event.clipboardData.items;
      console.log(JSON.stringify(items)); // will give you the mime types
      for (let index in items) {
        var item = items[index];
        if (item.kind === "file") {
          var blob = item.getAsFile();
          if (!blob) continue;
          try {
            onReceiveImage(getImageB64(blob), "no_name");
          } catch (e){}
        }
      }
    };
  }, []);

  const onDrop = useCallback(async (acceptedFiles:File[]) => {
    console.log("files", acceptedFiles);
    // Do something with the files
    for (let file of acceptedFiles){
      onReceiveImage(await getImageB64(file), file.name);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*",
  });
  return (
    <div
    {...getRootProps({
      onClick: event => event.stopPropagation(),
    })}
    >
    <Boxfc
      align="center"
      justify="center"
      border="8px dashed"
      borderColor="primary.main"
      minHeight="350px"
      bgcolor="background.default"
      borderRadius="20px"
      
    >
      <Box bgcolor="#C4C4C4" width="192px" height="122px"></Box>
      <H1>Drag & Drop or Copy and Paste</H1>
      <Txt>
        your image here, or{" "}
        <div
                  {...getRootProps()}
        >
        <Txt
          fontStyle="italic"
          style={{ textDecoration: "underline" }}
        >
          browse
          <input {...getInputProps()} />
        </Txt>
        </div>
      </Txt>
    </Boxfc>
    </div>
  );
};
