import React from "react";
import {story} from '../story';

export const HelloWorld = ({msg}:{msg?:string}) => {
  return (<>
    Hello world {msg}
  </>);
}

story(<HelloWorld msg="fuckyoumate"/>);
