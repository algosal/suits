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


?>