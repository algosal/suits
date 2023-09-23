<?php
// Include your database connection code here
// Example: 
include 'db_connection.php';
// Create a connection




//==================================

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
// Include your database connection code here
// Example: 
include 'db_connection.php';

// Create a connection to the database

///================================


$conn = new mysqli($servername, $username, $password, $database);
// Get the coupon code from the frontend
$couponCode = $_GET['couponCode'];
// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Perform a database query to check if the coupon code exists
$sql = "SELECT * FROM `Salesmen` WHERE `Coupon` = '$couponCode';";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // Coupon code is valid, retrieve the discount information
    $coupon = $result->fetch_assoc();

    // Send the discount information as JSON to the frontend
    echo json_encode($coupon);
} else {
    // Coupon code is invalid
    http_response_code(404);
    echo json_encode(array("message" => "Invalid coupon code."));
}
$conn->close();
?>
