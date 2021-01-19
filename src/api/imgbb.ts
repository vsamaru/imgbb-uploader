const uploadUrl = "https://api.imgbb.com/1/upload";

export async function upload(apiKey: string, image: string, name: string): Promise<{url:string, filename:string, thumbUrl:string}> {
  const formData = new FormData();
  formData.append("image", image);
  const resp = await (await fetch(`${uploadUrl}?key=${apiKey}`, {
    method: "POST",
    body: formData,
  })).json();
  if (!resp.success)
    throw `api upload fail: ${resp.status_code}: ${resp.error.message}`;
  console.log(resp.data.url_viewer)
  return { url: resp.data.display_url, filename:resp.data.image.filename, thumbUrl:resp.data.thumb.url, preUrl:resp.data.url_viewer };
}
