//dotenv ayasfelgm, create-reat-app, npm start or npm run build  sinaderge  dotenv abro install yhonal
const api_url = process.env.REACT_APP_API_URL;

//A function to send the login request to the server
// interface formDataType {
//     title : string
//     album : string
//     genre : string
//     artist : string
// }
const getSongs = async () => {
  const response = await fetch(`${api_url}/api/get`);
  let res =  await response.json()
  return res;
};

// Export the functions
export default getSongs