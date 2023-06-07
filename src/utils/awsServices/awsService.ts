import AWS from "aws-sdk";
import config from "config";
import dotenv from 'dotenv';
dotenv.config()
const AWS_IAM_ACCESS_KEY_ID: string | undefined = process.env.AWS_IAM_ACCESS_KEY_ID;
const AWS_IAM_SECRET_ACCESS_KEY: string | undefined = process.env.AWS_IAM_SECRET_ACCESS_KEY;
const AWS_REGION: string | undefined = process.env.AWS_REGION;

if (!AWS_IAM_ACCESS_KEY_ID || !AWS_IAM_SECRET_ACCESS_KEY || !AWS_REGION) {
    throw new Error('Missing AWS configuration. Please check your environment variables.');
  }
// Aws Secret Key
AWS.config.update({
  accessKeyId: AWS_IAM_ACCESS_KEY_ID,
  secretAccessKey: AWS_IAM_SECRET_ACCESS_KEY,
   region: AWS_REGION,
});
/**
 * This service upload a image in amazon simple storage service
 * @param {string} buffer.
 * @param {string} name.
 * @param {string} type.
 * Returns {string} promise resolved
 */
export const sendMessage = async (phoneNumber:string,otp:number) => {
    try {
        const params = {
            Message: `Your one time password:${otp}`,
            PhoneNumber: '+917355312681', // Replace with the desired phone number
            MessageAttributes: {
                'AWS.SNS.SMS.SenderID': {
                    'DataType': 'String',
                    'StringValue': "Appnox"
                }
            }
          };
      const response = await new AWS.SNS({apiVersion: '2010-03-31'}).publish(params).promise();
      return response;
    } catch (err: any) {
      return Promise.reject("otp send")
    }
  };
