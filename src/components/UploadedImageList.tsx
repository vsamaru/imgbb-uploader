import React, { useCallback, useEffect } from "react";
// prettier-ignore
import {
  Box, Boxfc, Boxf, BoxPaper, Hidden,  Content,BoxProps,Chip,
  BoxCont, BoxVert, BoxHori, TextField,
  H4, H1, H3, H2,Txt,
  Button,Touchable, Switch, Divider,Avatar,
} from "../MaterialUI";
import { print, timeAgo } from "../utils";
import { UploadedImage,colors } from "../data";
import {UploadedImageItem} from './UploadedImageItem'

export const UploadedImageList = ({items, onRemoveAll, onRemoveItem, ...bprops}:{items:UploadedImage[], onRemoveAll:()=>void, onRemoveItem:(item:UploadedImage, pos:number)=>void} & BoxProps) => {
  return (<Boxfc {...bprops} bgcolor="background.default">
    <Box ml={1} mb={2}><Button onClick={onRemoveAll} disabled={items.length == 0}>Clear</Button></Box>
    <Boxfc>
      {items.map((item, pos)=><UploadedImageItem key={item.key} item={item} onRemove={()=>onRemoveItem(item,pos)} mb={2}/>)}
    </Boxfc>
  </Boxfc>);
}
