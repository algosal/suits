document.addEventListener("DOMContentLoaded", function () {
  // Check if a coupon code exists in session storage
  const myTotalSessionStorage = sessionStorage;
  const selectedMeasurements = sessionStorage.getItem("selectedMeasurements");
  // console.log(selectedMeasurements);
  // console.log(JSON.parse(myTotalSessionStorage.couponCode));
  let couponCode = JSON.parse(myTotalSessionStorage.couponCode);
  // Function to verify the coupon code
  function verifyCouponCode() {
    // couponCode = false;
    if (couponCode) {
      // if (false) {
      // Send the coupon code to the server for validation
      axios
        .get(
          `https://suitsdevital.com/automation/confirmcoupon/confirmcoupon.php?couponCode=${encodeURIComponent(
            couponCode
          )}`
        )
        .then(function (response) {
          if (response.data && response.data !== "Invalid coupon code.") {
            // console.log(response);
            // Coupon code is valid, update the final price
            myTotalSessionStorage.finalPrice = JSON.parse(
              myTotalSessionStorage.selectedSuit
            ).Discounted_Price;
            // Display the adjusted price
            document.querySelector(".payment-details").innerHTML = `
                            <!-- Display selected suit details and measurements here -->
                            <h2>Adjusted Price: ${myTotalSessionStorage.finalPrice}</h2>
                        `;
          } else {
            console.log("converted price is ", selectedMeasurements);
            // Coupon code is invalid, use the original price
            myTotalSessionStorage.finalPrice = JSON.parse(
              myTotalSessionStorage.selectedSuit
            ).Price;

            // Display the original price
            document.querySelector(".payment-details").innerHTML = `
                            <!-- Display selected suit details and measurements here -->
                            <h2>Original Price: ${selectedMeasurements.finalPrice}</h2>
                        `;
          }
        })
        .catch(function (error) {
          console.error(error);
          alert("Failed to validate the coupon code. Please try again.");
        });
    } else {
      // No coupon code, use the original price
      myTotalSessionStorage.finalPrice = JSON.parse(
        myTotalSessionStorage.selectedSuit
      ).Price;
      console.log(
        "converted price is ",
        JSON.parse(myTotalSessionStorage.selectedSuit).Price
      );

      // Display the original price
      document.querySelector(".payment-details").innerHTML = `
                <!-- Display selected suit details and measurements here -->
                <h2>Original Price: ${parseFloat(
                  myTotalSessionStorage.finalPrice
                ).toFixed(2)}</h2>
            `;
    }
  }

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
      // Verify the coupon code
      verifyCouponCode();
    } else {
      alert("Selected suit not found. Please go back to select a suit.");
      window.location.href = "index.html"; // Redirect to the index page if the suit is missing
    }

    // Function to display suit details
    function displaySuitDetails(suit) {
      // console.log(suit);
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
        // selectedMeasurements.address = addressData;

        // Store the updated selectedMeasurements in sessionStorage
        sessionStorage.setItem("address", JSON.stringify(addressData));
        console.log(sessionStorage.selectedSuit);
        sessionStorage.setItem(
          "productUUID",
          JSON.parse(sessionStorage.selectedSuit).PaymentUUID
        );

        sessionStorage.setItem("email", document.getElementById("email").value);

        // console.log(JSON.parse(sessionStorage));

        // Redirect to the payment page
        // window.location.href = "payment-confirmation.html";
        window.location.href = "/payments/";
      });
  }
});
