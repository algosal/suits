<?php


// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
// Include your database connection code here
// Example: 
include 'db_connection.php';

// Create a connection to the database
$conn = new mysqli($servername, $username, $password, $database);


// Check if the ID parameter is provided in the URL
if (isset($_GET['id'])) {
    // Get the ID from the URL
    $id = $_GET['id'];
    // $id = 1;

    // Perform a database query to fetch the record with the specified ID
    // Replace 'your_table_name' with your actual table name
    $sql = "SELECT * FROM Products WHERE Id = $id";

    // Execute the query and fetch the result as an associative array
    // Modify this part based on your database connection library (e.g., mysqli or PDO)
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $record = $result->fetch_assoc();

        // Return the record as JSON
        echo json_encode($record);
    } else {
        // Record not found
        http_response_code(404);
        echo json_encode(array("message" => "Record not found."));
    }
} else {
    // ID parameter is missing
    http_response_code(400);
    echo json_encode(array("message" => "Missing ID parameter."));
}
?>
