const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
//config-> means to connect(ACCESS) cloudinary account by using credentials
cloudinary.config({
cloud_name:process.env.CLOUD_NAME,
api_key:process.env.CLOUD_API_KEY,
api_secret:process.env.CLOUD_API_SECRECT
})

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'mealmint_WEB',
      allowedformats: ["png","jpg","pdf","jpeg"],
       
    }
  });
  module.exports={
    cloudinary,
    storage
  }
