document.addEventListener("DOMContentLoaded", function () {
  // Load and parse the selectedMeasurements from sessionStorage
  const selectedMeasurements = JSON.parse(
    sessionStorage.getItem("selectedMeasurements")
  );

  if (!selectedMeasurements) {
    alert(
      "Selected measurements not found. Please go back to select measurements."
    );
    window.location.href = "index.html"; // Redirect to the index page if measurements are missing
  } else {
    const selectedSuit = sessionStorage.getItem("selectedSuit");

    if (selectedSuit) {
      // console.log(selectedSuit);
      displaySuitDetails(JSON.parse(selectedSuit));
      // Display measurements in the form fields
      displayMeasurements(selectedMeasurements["suit-measure"]);
    } else {
      alert("Selected suit not found. Please go back to select a suit.");
      window.location.href = "index.html"; // Redirect to the index page if suit is missing
    }

    // Function to display suit details
    function displaySuitDetails(suit) {
      console.log(suit);
      const suitDetails = `
                <img src="${
                  "https://suitsdevital.com/suitsdevadmin/" +
                  JSON.parse(suit.Image)[0].name
                }" alt="${suit.Name}">
                <h2>${suit.Name}</h2>
                <p>Price: ${suit.Price}</p>
            `;
      document.querySelector(".payment-details").innerHTML = suitDetails;
    }

    // Function to display measurements in the form fields
    function displayMeasurements(measurements) {
      // Display measurements in the form fields (same as in measurements-confirmation.js)
    }

    // Event listener for the pay button
    document
      .getElementById("pay-button")
      .addEventListener("click", function () {
        // Collect the address data from the form fields
        const addressData = {
          firstName: document.getElementById("firstName").value,
          lastName: document.getElementById("lastName").value,
          phoneNumber: document.getElementById("phoneNumber").value,
          email: document.getElementById("email").value,
          street: document.getElementById("street").value,
          city: document.getElementById("city").value,
          state: document.getElementById("state").value,
          zip: document.getElementById("zip").value,
          specialNote: document.getElementById("specialNote").value,
        };

        // Ensure that required fields are not empty
        for (const key in addressData) {
          if (!addressData[key]) {
            alert(`Please enter your ${key}.`);
            return;
          }
        }

        // Add address and price to the selectedMeasurements object
        selectedMeasurements.address = addressData;
        selectedMeasurements.price = selectedSuit.price;

        // Store the updated selectedMeasurements in sessionStorage
        sessionStorage.setItem(
          "selectedMeasurements",
          JSON.stringify(selectedMeasurements)
        );

        // Redirect to the coupon-page.html
        window.location.href = "../payment-page/";
      });
  }
});
