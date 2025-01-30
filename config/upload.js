import { v2 as cloudinary } from 'cloudinary';

export const upload = async (file) => {

 // Configuration
    cloudinary.config({ 
        cloud_name: 'erick', 
        api_key: '773544333878497', 
        api_secret: 'DEhIRmthcafxtqSWmn8eDhMBp0o' // Click 'View API Keys' above to copy your API secret
    });

    // Upload an image
      const uploadResult = await cloudinary.uploader
      .upload(
             'https://media.licdn.com/dms/image/v2/C4E03AQEo2D51RgskYw/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1660173807723?e=2147483647&v=beta&t=tz4QAYTaWxd_3N1BnVAg4-wKZjfd3vqNSDwx4i7HsJg', {
              public_id: 'Tomas12',
          }
      )
      .catch((error) => {
          console.log(error);
      });
   
   console.log(uploadResult);

   console.log(uploadResult);
    
   // Optimize delivery by resizing and applying auto-format and auto-quality
   const optimizeUrl = cloudinary.url('Tomas12', {
       fetch_format: 'auto',
       quality: 'auto'
   });
   
   console.log(optimizeUrl);
   
   // Transform the image: auto-crop to square aspect_ratio
   const autoCropUrl = cloudinary.url('Tomas12', {
       crop: 'auto',
       gravity: 'auto',
       width: 200,
       height: 200,
   });
   
   console.log(autoCropUrl); 

   return uploadResult;

}

