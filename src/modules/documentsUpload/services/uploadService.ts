import AWS from "aws-sdk";
import dotenv from 'dotenv';
import fs from "fs";
import { logger } from "../../../utils/logger";
import FileType from "file-type";
import multiparty from "multiparty";
import { Exception } from "../../../utils";

dotenv.config();

const AWS_ACCESS_KEY_ID: string | undefined = process.env.AWS_ACCESS_KEY_ID;
const AWS_SECRET_ACCESS_KEY: string | undefined = process.env.AWS_SECRET_ACCESS_KEY;
const AWS_REGION: string | undefined = process.env.AWS_REGION
console.log("-------------",AWS_REGION,AWS_ACCESS_KEY_ID,AWS_SECRET_ACCESS_KEY)
if (!AWS_ACCESS_KEY_ID || !AWS_SECRET_ACCESS_KEY || !AWS_REGION) {
  throw new Error('Missing AWS configuration. Please check your environment variables.');
}

// Aws Secret Key
AWS.config.update({
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
  region: AWS_REGION,
});

// Acquiring The AWS S3 Functionality
const s3 = new AWS.S3();

export class FileUploadService {
  async DocumentUpload(req: any) {
    try {
      const form = new multiparty.Form();
  
      return new Promise((resolve, reject) => {
        form.parse(req, async (err, fields, files) => {
          if (err) {
            reject(err);
            return;
          }
  
          try {
            const filePath = files.file[0].path;
            const buffer = fs.readFileSync(filePath);
            const type = await FileType.fromBuffer(buffer);
  
            // Replacing The File Name
            const fileName = await this.replaceFileName(files.file[0].originalFilename, type);
  
            // Calling The Service To Upload The Image To S3 Bucket
            const result = await this.uploadFile(buffer, fileName, type);
            const imagePath = result?.Key;
  
            // Getting The Value of AWS_IMAGE_URL From .env File
            const AWS_IMAGE_URL: string | undefined = process.env.AWS_IMAGE_URL;
            if (!AWS_IMAGE_URL) {
              throw new Error('Missing AWS_IMAGE_URL configuration. Please check your environment(.env) variables.');
            }
            const baseUrl = AWS_IMAGE_URL;
            const data = { imagePath, baseUrl };
  
            // Sending The Response To User
            resolve(data);
          } catch (err) {
            reject(err);
          }
        });
      });
    } catch (err) {
      return Promise.reject(err);
    }
  }
  
  async toGetFilename(fileName: string) {
    try {
      const newFilename = `appnox/Real-Estate-Documents/${fileName}_${Date.now().toString()}`;
      return newFilename;
    } catch (err) {
      logger.error("Error occurred while getting the file name", err);
      throw err;
    }
  }

  async replaceFileName(fileName: any, type: any) {
    try {
      let extLength = type.ext.length + 1;

      fileName = fileName.slice(0, -extLength);

      fileName = fileName.replace(/[\W_]+/g, "_");
      const newFilename = await this.toGetFilename(fileName);
      return newFilename;
    } catch (err) {
      logger.error("Error occurred in file name replacement", err);
      throw err;
    }
  }

  async uploadFile(buffer: any, name: any, type: any) {
    try {
      const params = {
        ACL: "public-read",
        Body: buffer,
        Bucket: "harsha-temp",
        ContentType: type.mime,
        Key: `${name}.${type.ext}`,
      };
      const response = await s3.upload(params).promise();
      logger.info("File was uploaded successfully");
      return response;
    } catch (err) {
      logger.error("Error occurred in file uploading", err);
      throw err;
    }
  }
}
