//dotenv ayasfelgm, create-reat-app, npm start or npm run build  sinaderge  dotenv abro install yhonal
const api_url = process.env.REACT_APP_API_URL;

//A function to send the login request to the server
// interface formDataType {
//     title : string
//     album : string
//     genre : string
//     artist : string
// }
const Delete = async (id:string) => {
    console.log(api_url)
  const requestOptions = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  };
  const response = await fetch(`${api_url}/api/delete/${id}`, requestOptions);
  return await response.json();
};

// Export the functions
export default Delete