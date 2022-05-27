"use strict";
const axios = require('axios');
const VIMEO_API_KEY = process.env.VIMEO_API_KEY;


const uploadToVimeo = async (fileName, fileLink) => {
  return new Promise (async (resolve,reject)=>{
  const body = JSON.stringify({
    "upload": {
      "approach": "pull",
      "link": fileLink
    },
    "name": fileName,
    "privacy": { "view": "unlisted", "embed" : "whitelist", "download" : false }
  });
  const config = {
    method: 'post',
    url: 'https://api.vimeo.com/me/videos',
    headers: { 
      'Authorization': `Bearer ${VIMEO_API_KEY}`, 
      'Content-Type': 'application/json', 
    },
    data : body
  };
  try {
    const response = await axios(config);
    if(response.status !== 201) {
      throw new Error(`Invalid status: ${response.status}, expected 201`);
    }
    resolve(response);
    // return response
  } catch (err) {
    console.log('Upload to vimeo failed');
    console.log(err);
    // return null;
    reject(err)
  }
  })
}

module.exports.upload = async (data) => {
  let body  = JSON.parse(data.body)
  console.log(data.body.recording)
  // let body = data.body
  if(body.event !== 'recording.statusUpdate' && body.recording.status !== 'UPLOADED') {
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Noop",
      }),
    };
  }else{
    
  const fileName = body.recording.recordingId;
  const fileLink = body.recording.downloadUrl;
  if(fileLink){
  await uploadToVimeo(fileName, fileLink)
  .then(async response=>{
  console.log(response.data.player_embed_url);

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "Upload to vimeo done",
        data : response.data.player_embed_url
      },
      null,
      2
    ),
  };
  }).catch(err=>{
    return {
    statusCode: 500,
    body: JSON.stringify(
      {
        message: "Upload to vimeo not done",
        error:err.message
      },
      null,
      2
    ),
  };
    
  })
  
  }else{
    return {
      statusCode: 404,
      body: JSON.stringify({
        message: "Link missing ",
      }),
    }
  }
  }
};
