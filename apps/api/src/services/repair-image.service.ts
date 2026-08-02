import cloudinary from "../config/cloudinary";
import streamifier from "streamifier";

export function uploadBuffer(buffer:Buffer){

    return new Promise<string>((resolve,reject)=>{

        const stream=cloudinary.uploader.upload_stream(
            {
                folder:"repairdesk",
            },
            (error,result)=>{
                if(error){
                    reject(error);
                    return;
                }
                resolve(result!.secure_url);
            }
        );
        streamifier.createReadStream(buffer).pipe(stream);
    });
}