<?php
header("Access-Control-Allow-Origin: http://127.0.0.1:5500"); // Replace with your actual origin
header("Access-Control-Allow-Methods: POST, GET, OPTIONS"); // Allow the HTTP methods you need
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Content-Type: application/json"); // Set the response content type

include "db_connections.php";


// Create a connection to the database
$conn = new mysqli($servername, $username, $password, $dbname);

// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Receive the JSON data from POST request
$data = file_get_contents('php://input');
$jsonObject = json_decode($data, true);

// Extract data from the JSON object
$suitMeasure = $jsonObject['suitMeasure'];
$address = json_decode($jsonObject['address'], true); // Decode the address JSON string
$email = $jsonObject['email'];
$globalId = $jsonObject['globalId'];
$selectedSuit = $jsonObject['selected_suit'];
$couponCode = $jsonObject['coupon_code'];
$FinalPrice = $jsonObject['final_price'];

// $FinalPrice ="200";

// $selectedSuitId = $selectedSuit['Id'];

$cost = $jsonObject['cost'];
$tailorMaster = $jsonObject['tailor_master'];
$apprentice = $jsonObject['apprentice'];
$testTailor = $jsonObject['test_tailor'];

// // Insert address data into the address_table
// $addressQuery = "INSERT INTO address_table (globalId, firstName, lastName, phoneNumber, email, street, city, state, zip, specialNote)
// VALUES (
//     '$globalId',
//     '{$address['firstName']}',
//     '{$address['lastName']}',
//     '{$address['phoneNumber']}',
//     '{$address['email']}',
//     '{$address['street']}',
//     '{$address['city']}',
//     '{$address['state']}',
//     '{$address['zip']}',
//     '{$address['specialNote']}'
// )";

// if ($conn->query($addressQuery) === TRUE) {
//     $addressId = $conn->insert_id;
// } else {
//     echo "Error inserting address data: " . $conn->error;
// }
// Insert address data into the address_table using prepared statement
$addressQuery = "INSERT INTO address_table (globalId, firstName, lastName, phoneNumber, email, street, city, state, zip, specialNote)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

$stmtAddress = $conn->prepare($addressQuery);
$stmtAddress->bind_param("ssssssssss", $globalId, $address['firstName'], $address['lastName'], $address['phoneNumber'], $address['email'], $address['street'], $address['city'], $address['state'], $address['zip'], $address['specialNote']);

if ($stmtAddress->execute()) {
    $addressId = $conn->insert_id;
} else {
    echo "Error inserting address data: " . $stmtAddress->error;
}

$stmtAddress->close();



// Insert suit measurement data into measurements_table
// Insert suit measurement data into measurements_table using prepared statement
$suitMeasureQuery = "INSERT INTO measurements_table (globalId, chest, overArm, waist, hip, neck, sleeve, height, selectedSpacing, weight, specialInstructions, couponCode)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

$stmtMeasure = $conn->prepare($suitMeasureQuery);
$stmtMeasure->bind_param("ssssssssssss", $globalId, $suitMeasure['chest'], $suitMeasure['overArm'], $suitMeasure['waist'], $suitMeasure['hip'], $suitMeasure['neck'], $suitMeasure['sleeve'], $suitMeasure['height'], $suitMeasure['selectedSpacing'], $suitMeasure['weight'], $suitMeasure['specialInstructions'], $couponCode);

if ($stmtMeasure->execute()) {
    $suitMeasureId = $conn->insert_id;
} else {
    echo "Error inserting suit measurement data: " . $stmtMeasure->error;
}

$stmtMeasure->close();



// // Insert order data into orders_table
// $orderQuery = "INSERT INTO order_table (globalId, selected_suit, cost, tailor_master, apprentice, test_tailor, email)
// VALUES (
//     '$globalId',
//     '$selectedSuit',
//     '$cost',
//     '$tailorMaster',
//     '$apprentice',
//     '$testTailor',
//     '$email'
// )";

// if ($conn->query($orderQuery) === TRUE) {
//     echo "Order data inserted successfully";
// } else {
//     echo "Error inserting order data: " . $conn->error;
// }

// Insert order data into orders_table using prepared statement
$orderQuery = "INSERT INTO order_table (globalId, selected_suit, cost, tailor_master, apprentice, test_tailor, email, FinalPrice, couponCode)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

$stmtOrder = $conn->prepare($orderQuery);
$stmtOrder->bind_param("sssssssss", $globalId, $selectedSuit, $cost, $tailorMaster, $apprentice, $testTailor, $email, $FinalPrice, $couponCode);

if ($stmtOrder->execute()) {
    echo "Order data inserted successfully";
} else {
    echo "Error inserting order data: " . $stmtOrder->error;
}

$stmtOrder->close();


// Close the database connection
$conn->close();
?>
