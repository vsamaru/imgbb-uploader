import React, { useCallback, useEffect, useState } from "react";
// prettier-ignore
import {
  Box, Boxfc, Boxf, BoxPaper, Hidden,  Content,BoxProps,Chip,
  BoxCont, BoxVert, BoxHori, TextField,
  H4, H1, H3, H2,Txt,
  Button,Touchable, Switch, Divider,Avatar,
} from "../MaterialUI";
import { print, timeAgo } from "../utils";
import { UploadedImage, colors } from "../data";
const IconButton = require("@material-ui/core/IconButton").default;
const ClearIcon = require("@material-ui/icons/Clear").default;
const FileCopyIcon = require("@material-ui/icons/FileCopy").default;
const LinearProgress = require("@material-ui/core/LinearProgress").default;
const Snackbar = require("@material-ui/core/Snackbar").default;

export const UploadedImageItem = ({
  item,
  onRemove,
  ...bprops
}: { item: UploadedImage; onRemove } & BoxProps) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  return (
    <Box {...bprops}>
      <Boxf justify="space-between" bgcolor={colors.blueItemBackground}>
        <Boxf align="center">
          <Box
            height={150}
            bgcolor="#2D3748"
            width={230}
            style={
              !item.imgbbLink
                ? {}
                : {
                    backgroundImage: `url(${item.imgbbThumbLink})`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                  }
            }
          ></Box>
          <Boxfc ml={2}>
            <Boxf align="center">
              <H4 mr={0.5}>{item.name}</H4>
              <IconButton size="small" onClick={onRemove}>
                <ClearIcon fontSize="small" />
              </IconButton>
            </Boxf>
            <Txt>{timeAgo(item.date)}</Txt>
          </Boxfc>
        </Boxf>
        <Boxf align="center" pr={2}>
          {(() => {
            switch (item.status) {
              case "not_yet_uploaded":
              case "loading":
                return (
                  <Boxfc>
                    <Txt>uploading...</Txt>
                    <LinearProgress style={{ width: "140px" }} />
                  </Boxfc>
                );
              case "uploaded":
                return (
                  <Box>
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      autoHideDuration={1000}
                      startIcon={<FileCopyIcon />}
                      onClick={() => {
                        navigator.clipboard.writeText(item.imgbbLink as string);
                        setSnackbarOpen(true);
                      }}
                    >
                      Copy Link
                    </Button>
                  </Box>
                );
            }
          })()}
        </Boxf>
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          open={snackbarOpen}
          onClose={() => setSnackbarOpen(false)}
          message="Link copied!"
        />
        {/*<Boxfc width="100px" align="center"height="100%">
        <Boxfc width="100px" align="center"height="100%">
            
        </Boxfc>
        </Boxfc>*/}
      </Boxf>
    </Box>
  );
};
