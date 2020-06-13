import React from "react";
import { storiesOf } from "@storybook/react";
import { action as action2 } from "@storybook/addon-actions";
import { withKnobs, text, boolean } from "@storybook/addon-knobs";
import { MuiThemeProvider } from "../MuiThemeProvider";
import { DragAndDropImage } from "../components/DragAndDropImage";
import { UploadedImageItem } from "../components/UploadedImageItem";
import { UploadedImageList } from "../components/UploadedImageList";
import {UploadedImage} from '../data'
const action = (str: string) => (...args) => console.log(`action("${str}") `, args);

const MuiThemeDecorator = storyFn => (
  <MuiThemeProvider>{storyFn()}</MuiThemeProvider>
);

storiesOf("components|DragAndDropImage", module)
  .addDecorator(MuiThemeDecorator)
  .add("normal", () => (
    <DragAndDropImage
      onReceiveImage={image => {
        console.log("received", image);
      }}
    />
  ))
  .add("disabled", () => (
    <DragAndDropImage
      onReceiveImage={image => {
        console.log("received", image);
      }}
      disabled={true}
    />
  ));


const item:UploadedImage = {
  key:'0',
  name: "randomImage.png",
  status: "uploaded",
  imgbbLink:
    "https://www.rover.com/blog/wp-content/uploads/2019/05/puppy-in-bowl.jpg",
  imgbbThumbLink:null,
  date: new Date(),
}

storiesOf("components|UploadedImageItem", module)
  .addDecorator(MuiThemeDecorator)
  .add("uploaded", () => (
    <UploadedImageItem
      item={{
        ...item,
      }}
      onRemove={action("remove")}
    />
  ))
  .add("loading", () => (
    <UploadedImageItem
      item={{
        ...item,
        status:'loading',
        imgbbLink:null,
      }}
      onRemove={action("remove")}
    />
  ))
  .add("not_yet_uploaded", () => (
    <UploadedImageItem
      item={{
        ...item,
        status: "not_yet_uploaded",
        imgbbLink:null,
      }}
      onRemove={action("remove")}
    />
  ))

storiesOf("components|UploadedImageList", module)
  .addDecorator(MuiThemeDecorator)
  .add("normal", () => (
    <UploadedImageList
      items={[{
        key:'1',
        name: "randomImage.png",
        status: "not_yet_uploaded",
        imgbbLink:null,
        imgbbThumbLink:null,
        date: new Date(),
      },{
        key:'0',
        name: "randomImage.png",
        status: "uploaded",
        imgbbLink:
          "https://www.rover.com/blog/wp-content/uploads/2019/05/puppy-in-bowl.jpg",
        date: new Date(),
      }, {
        key:'2',
        name: "randomImage.png",
        status: "loading",
        imgbbLink:null,
        imgbbThumbLink:null,
        date: new Date(),
      }]}
      onRemove={action("remove")}
    />
  ))
  .add("empty", () => (
<UploadedImageList
      items={[]}
      onRemove={action("remove")}
    />
  ))