import React from "react";
import { storiesOf } from "@storybook/react";
import { action as action2 } from "@storybook/addon-actions";
import { withKnobs, text, boolean } from "@storybook/addon-knobs";
import { Button } from "../components/button";
import { MuiThemeProvider } from "../MuiThemeProvider";
import { DragAndDropImage } from "../components/DragAndDropImage";
import { UploadedImageItem } from "../components/UploadedImageItem";
import { UploadedImageList } from "../components/UploadedImageList";

const action = (str: string) => (...args) => console.log(`action("${str}") `, args);

const MuiThemeDecorator = storyFn => (
  <MuiThemeProvider>{storyFn()}</MuiThemeProvider>
);
/*
const DEFAULT_STYLE = "background: #cce6ff;\ncolor: #333;";

storiesOf("Button", module)
  .addDecorator(withKnobs)
  .add("with text", () => (
    <Button
      onClick={action("clicked")}
      disabled={boolean("Disabled", false)}
      css={text("CSS", DEFAULT_STYLE)}
    >
      {text("Label", "Hello Storybook")}
    </Button>
  ));
*/

storiesOf("components|DragAndDropImage", module)
  .addDecorator(MuiThemeDecorator)
  .add("normal", () => (
    <DragAndDropImage
      onReceiveImage={image => {
        console.log("received", image);
      }}
    />
  ));

storiesOf("components|UploadedImageItem", module)
  .addDecorator(MuiThemeDecorator)
  .add("uploaded", () => (
    <UploadedImageItem
      item={{
        name: "randomImage.png",
        status: "uploaded",
        imgbbLink:
          "https://www.rover.com/blog/wp-content/uploads/2019/05/puppy-in-bowl.jpg",
        date: new Date(),
      }}
      onRemove={action("remove")}
    />
  ))
  .add("loading", () => (
    <UploadedImageItem
      item={{
        name: "randomImage.png",
        status: "loading",
        imgbbLink:null,
        date: new Date(),
      }}
      onRemove={action("remove")}
    />
  ))
  .add("not_yet_uploaded", () => (
    <UploadedImageItem
      item={{
        name: "randomImage.png",
        status: "not_yet_uploaded",
        imgbbLink:null,
        date: new Date(),
      }}
      onRemove={action("remove")}
    />
  ))

storiesOf("components|UploadedImageList", module)
  .addDecorator(MuiThemeDecorator)
  .add("normal", () => (
    <UploadedImageList
      items={[{
        key:1,
        name: "randomImage.png",
        status: "not_yet_uploaded",
        imgbbLink:null,
        date: new Date(),
      },{
        key:2,
        name: "randomImage.png",
        status: "uploaded",
        imgbbLink:
          "https://www.rover.com/blog/wp-content/uploads/2019/05/puppy-in-bowl.jpg",
        date: new Date(),
      }, {
        key:3,
        name: "randomImage.png",
        status: "loading",
        imgbbLink:null,
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