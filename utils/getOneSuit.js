// Import Axios library (make sure Axios is included in your project)
// import axios from "axios";

// Define the URL to your PHP script
const apiUrl =
  "https://suitsdevital.com/automation/onesuitonid/getoneRecord.php";

// Function to fetch a record by ID from the database
async function getOneSuit(id) {
  try {
    // Send a GET request to the PHP script with the provided ID
    const response = await axios.get(`${apiUrl}?id=${id}`);

    // Check if the request was successful (status code 200)
    if (response.status === 200) {
      // Access the data returned by the PHP script
      const record = response.data;

      // Output the record data (assuming your PHP script returns JSON data)
      //   console.log("ID:", record.Id);
      //   console.log("Name:", record.Name);
      //   console.log("Description:", JSON.parse(record.Image)[0].name);
      // Add more fields as needed
      return record;
    } else {
      console.error("Error:", response.status);
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

// Call the fetchRecordById function with the desired ID to retrieve and display the record
//fetchRecordById(1); // Replace '1' with the ID of the record you want to fetch
