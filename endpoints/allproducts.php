<?php
// Set CORS headers to allow any origin to access this resource
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Check if it's an OPTIONS request (preflight request)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204); // 204 No Content status for preflight requests
    exit();
}

// Database connection parameters
$servername = "localhost";
$username = "suitsdev_suitsde";
$password = "(laxamana19).S";
$database = "suitsdev_suitsdev";

// Create a connection to the database
$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// SQL query to select specific fields from Products table
$sql = "SELECT id, name, price, discounted_price, image FROM Products";

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // Initialize an array to store the product objects
    $products = array();

    while ($row = $result->fetch_assoc()) {
        // Create a product object with selected fields
        $product = array(
            // "test"=>$row,
            "id" => $row["id"],
            "name" => $row["name"],
            "price" => $row["price"],
            "discounted_price" => $row["discounted_price"],
            "image" => $row["image"]
        );
//  $product = $row;
        // Add the product object to the array
        $products[] = $product;
    }

    // Convert the array to JSON and echo it (or send it to the client as needed)
    $json_response = json_encode($products);
    echo $json_response;
    // echo $json_response;
} else {
    echo "No products found.";
}

// Close the database connection
$conn->close();
?>
