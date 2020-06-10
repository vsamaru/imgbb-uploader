import * as imgbb from "../imgbb";

const fs = require("fs");


async function upload(apiKey, filename){
  const image = fs.readFileSync(filename).toString();
  const res = await imgbb.upload(apiKey, image, "image-test.jpeg");
  console.log(`result for ${filename}:`, res);
}

it("matches snapshot", async () => {
  const apiKey = process.env.IMGBB_API_KEY;
  if (!apiKey) throw `missing env variable IMGBB_API_KEY`;
  await upload(apiKey, __dirname + "/image-test.b64")
  await upload(apiKey, __dirname + "/image-test2.b64")
});