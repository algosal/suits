document.addEventListener("DOMContentLoaded", function () {
  const searchButton = document.getElementById("searchButton");
  const coatIdInput = document.getElementById("coatId");
  const coatDetails = document.getElementById("coatDetails");

  searchButton.addEventListener("click", function () {
    const uniqueIdentifier = coatIdInput.value;

    // Replace this with your API endpoint once it's available
    // Example: const apiUrl = `https://your-api.com/coats/${uniqueIdentifier}`;
    const apiUrl = ""; // Empty for now since the endpoint is under construction

    if (!uniqueIdentifier) {
      alert("Please enter a unique identifier.");
      return;
    }

    // Use fetch or another method to request coat details from the API
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        // Replace this with code to display coat details once you have the data
        // Example: coatDetails.innerHTML = `Coat Name: ${data.name}, Color: ${data.color}, ...`;
      })
      .catch((error) => {
        console.error("Error fetching coat details:", error);
      });
  });
});
