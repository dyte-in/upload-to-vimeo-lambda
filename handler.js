"use strict";
const axios = require('axios');
const VIMEO_API_KEY = process.env.VIMEO_API_KEY;






const uploadToVimeo = async (fileName, fileLink) => {
  const body = JSON.stringify({
    "upload": {
      "approach": "pull",
      "link": fileLink
    },
    "name": fileName
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
    return response;
  } catch (err) {
    console.log('Upload to vimeo failed');
    console.log(err);
    return null;
  }
}

module.exports.upload = async (data) => {
  if(data.event !== 'recording.statusUpdate' || data.recording.status !== 'UPLOADED') {
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Noop",
      }),
    };
  }

  const fileName = data.recording.recordingId;
  const fileLink = data.recording.downloadUrl;

  const response = await uploadToVimeo(fileName, fileLink);
  console.log(response.data);

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "Upload to vimeo done",
      },
      null,
      2
    ),
  };
};
