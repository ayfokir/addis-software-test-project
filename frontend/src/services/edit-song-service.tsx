//dotenv ayasfelgm, create-reat-app, npm start or npm run build  sinaderge  dotenv abro install yhonal
import {Song} from "../utils/Types";
const api_url = process.env.REACT_APP_API_URL;
//A function to send the login request to the server
// interface formDataType {
//     title : string
//     album : string
//     genre : string
//     artist : string
// }
const Edit = async (formData: Song) => {
  console.log(api_url);
  const requestOptions = {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  };
  console.log("About to send request");
  console.log(requestOptions.body);
  const response = await fetch(`${api_url}/api/edit`, requestOptions);
  return response;
};

// Export the functions
export default Edit;
