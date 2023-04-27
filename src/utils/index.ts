const devURL = 'http://localhost:3000/';
const prodURL = 'https://nextjswithtypescript-three.vercel.app/';
const env = process.env.NODE_ENV;
const isDEV = env == "development";
const WebURL = isDEV ? devURL : prodURL;
const errorKey = 'FCBayernMunich2024'
export default {
    WebURL,
    errorKey
}