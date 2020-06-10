export type UploadedImage = {
    key:string;
    status:"loading"|"not_yet_uploaded"|"uploaded";
    name:string;
    date:Date;
    imgbbLink:string|null;
    imgbbThumbLink:string|null;
}

export type AppData = {
    apiKey:string;
    uploadedImages:UploadedImage[];
    //onReceiveImage:(string)=>void;
}

export const defaultAppData:AppData = {
    apiKey:'',
    uploadedImages:[]
}

export type ApiCall = {
    imgbb:(string)=>void;
}


export const colors = {
    blue:'#4299E1',
    blueItemBackground:'#EDF2F7'
}