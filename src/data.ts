export type UploadedImage = {
    status:"loading"|"not_yet_uploaded"|"uploaded";
    name:string;
    date:Date;
    imgbbLink:string|null;
}

export type DataContext = {
    apiKey:string;
    uploadedImages:UploadedImage[];

    onReceiveImage:(string)=>void;

}

export type ApiCall = {
    imgbb:(string)=>void;
}