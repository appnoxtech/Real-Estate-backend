import admin from "firebase-admin";
import { Exception } from "../utils";
import { ERROR_TYPE } from "../utils/constants";
require("dotenv").config();

const private_key_id :string | undefined = process.env.PRIVATE_KEY_ID 
const private_key :string | undefined  = process.env.PRIVATE_KEY  
const client_id :string | undefined  = process.env.CLIENT_ID  
const client_x509_cert_url :string | undefined = process.env.CLIENT_X509_CERT_URL 
const client_email :string | undefined = process.env.CLIENT_EMAIL 

if(!private_key_id || !private_key || !client_id || !client_x509_cert_url || !client_email){
 throw new Exception(ERROR_TYPE.BAD_REQUEST,"Missing FIREBASE configuration. Please check your environment variables.")
}
const notificationsConfig: any = {
    type: "service_account",
    project_id: "real-estate-project-11587",
    private_key_id: private_key_id,
    private_key: private_key,
    client_email: client_email,
    client_id:client_id ,
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url:client_x509_cert_url
};

admin.initializeApp({
  credential: admin.credential.cert(notificationsConfig),
});

export default admin;
