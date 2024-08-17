//dotenv ayasfelgm, create-reat-app, npm start or npm run build  sinaderge  dotenv abro install yhonal
const api_url = process.env.REACT_APP_API_URL;

//A function to send the login request to the server
interface formDataType {
    title : string
    album : string
    genre : string
    artist : string
}
const Create = async (formData: formDataType) => {
    console.log(api_url)
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData)
  };
  console.log("About to send request");
  console.log(requestOptions.body);
  const response = await fetch(`${api_url}/api/create`, requestOptions);
  return response;
};

// Export the functions
export default Create