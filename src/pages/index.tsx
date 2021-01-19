import React, {
  useState,
  useContext,
  useCallback,
  useEffect,
  useRef,
} from "react";
import Img from 'gatsby-image';
import {graphql, useStaticQuery} from 'gatsby'
// prettier-ignore
import {
  Box, Boxfc, Boxf, BoxPaper, Hidden,  Content,BoxProps,Chip,
  BoxCont, BoxVert, BoxHori, TextField,
  H4, H1, H3, H2,Txt,
  Button,Touchable, Switch, Divider,Avatar,
  Rect
} from "../MaterialUI";
import { defaultAppData, AppData, UploadedImage } from "../data";
import { DragAndDropImage } from "../components/DragAndDropImage";
import { UploadedImageList } from "../components/UploadedImageList";
import { print, makeid, useStateObj } from "../utils";
import "../styles.css";
import api from "../api/index";
import { GITHUB_LINK,PUBLIC_URL } from "../../appConfig";
import { MuiThemeProvider } from "../MuiThemeProvider";
import {SEO} from '../components/seo';

const DataContext = React.createContext<
  AppData & {
    updateApiKey: (key: string) => void;
  }
>(null as any);

const ApiKeyField = ({ ...bprops }: {} & BoxProps) => {
  const { apiKey, updateApiKey } = useContext(DataContext);

  return (
    <Boxf {...bprops}>
      <H4 mr={2}>
        {" "}
        your{" "}
        <a
          style={{
            textDecoration: "underline",
            fontStyle: "italic",
            color: "inherit",
          }}
          href="https://api.imgbb.com/"
          target="_blank"
        >
          API key
        </a>
        :
      </H4>

      <TextField
        defaultValue={apiKey}
        placeholder="add api key..."
        variant="outlined"
        onBlur={ev => {
          updateApiKey(ev.target.value);
        }}
      />
    </Boxf>
  );
};

const localStorage = typeof window == `undefined` ? {
  getItem(str){return null;},
  setItem(str,v){return ;}
} : window.localStorage;

function getInitialAppData(): AppData {
  const st = localStorage.getItem("appData");
  if (st) {
    let x: AppData = JSON.parse(st);
    for (let e of x.uploadedImages) {
      e.date = new Date((e.date as unknown) as string);
    }
    return x;
  }
  return defaultAppData;
}

const App = () => {
  const [data, updateData, dataRef] = useStateObj<AppData>(getInitialAppData());

  const gqdata = useStaticQuery(graphql`
  {
  presentationImage: file(relativePath: {eq: "presentation.png"}) {
    childImageSharp {
      fluid {
				 base64
        aspectRatio
        sizes
        src
        srcSet

      }
    }
  }
  logoImage: file(relativePath: {eq: "logo.png"}) {
    childImageSharp {
      fluid {
				 base64
        aspectRatio
        sizes
        src
        srcSet

      }
    }
  }
}
  `)
  print(gqdata);
  useEffect(() => {
    setTimeout(() => {
      localStorage.setItem("appData", JSON.stringify(data));
    }, 100);
  }, [data]);

  const uploadImage = useCallback(
    async (imagePrm: Promise<string>, name: string) => {
      let key = makeid();
      const apiKey = dataRef.current.apiKey;
      updateData({
        uploadedImages: [
          {
            status: "loading",
            key: key,
            name: name,
            date: new Date(),
            imgbbLink: null,
            imgbbThumbLink: null,
            preUrl: null
          },
          ...dataRef.current.uploadedImages,
        ],
      });
      let res;
      try {
        res = await api.imgbb.upload(apiKey, await imagePrm, name);
      } catch (e) {
        updateData({
          uploadedImages: dataRef.current.uploadedImages.map(e =>
            e.key == key ? { ...e } : e
          ), //add error
        });
        return;
      }
      updateData({
        uploadedImages: dataRef.current.uploadedImages.map(e =>
          e.key == key
            ? {
                ...e,
                status: "uploaded",
                imgbbLink: res.url,
                imgbbThumbLink:res.thumbUrl,
          preUrl: res.viewer
              }
            : e
        ),
      });
      print("res", res);
    },
    [data]
  );

  return (
    <MuiThemeProvider>
      <DataContext.Provider
        value={{
          ...data,
          updateApiKey: apiKey => {
            updateData({ apiKey });
          },
        }}
      >
        <SEO />
        <BoxCont px={2} height="100%">
          <Boxfc justify="space-between" height="100%">
            <Boxfc>
              <Boxfc>
                <a
                  href="/"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <Boxf align="center">
                    <Img fluid={gqdata.logoImage.childImageSharp.fluid} alt="logo" style={{width:'84px',height:'35px'}} />
                    <H3 fontStyle="italic">Uploader</H3>
                  </Boxf>
                </a>
                <Boxf justify="space-between">
                  <Boxfc>
                    <H1 mb={1}>paste an image and get</H1>
                    <H1>an Imgbb Url Link</H1>
                  </Boxfc>
                  <Img fluid={gqdata.presentationImage.childImageSharp.fluid} alt="presentation" style={{width:'200px'}} />
                </Boxf>
              </Boxfc>
              <ApiKeyField mb={1} />
              <DragAndDropImage onReceiveImage={uploadImage} disabled={false/*data.apiKey.length == 0*/} />
              <UploadedImageList
                mt={2}
                items={data.uploadedImages}
                onRemoveAll={() => updateData({ uploadedImages: [] })}
                onRemoveItem={itemToRemove =>
                  updateData({
                    uploadedImages: dataRef.current.uploadedImages.filter(
                      e => e.key != itemToRemove.key
                    ),
                  })
                }
              />
            </Boxfc>
            <Boxf p={2}>
              <Txt mr={3}>2020 © anisg</Txt>{" "}
              <a
                href={GITHUB_LINK}
                style={{ color: "inherit", fontStyle: "italic" }}
                target="_blank"
              >
                <span>View code on Github</span>
              </a>
            </Boxf>
          </Boxfc>
        </BoxCont>
      </DataContext.Provider>
    </MuiThemeProvider>
  );
};

export default App;
