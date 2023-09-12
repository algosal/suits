// JavaScript code for handling measurements confirmation

// Function to load and display selected suit and measurements from sessionStorage
function loadSuitAndMeasurements() {
  // Retrieve selected measurements and suit from sessionStorage
  const selectedMeasurements = JSON.parse(
    sessionStorage.getItem("selectedMeasurements")
  );
  const selectedSuit = JSON.parse(sessionStorage.getItem("selectedSuit"));

  // Display selected suit details
  const suitDetailsElement = document.querySelector(".suit-details");
  const suitImageElement = document.querySelector(".suit-image");

  // Check if selected measurements and suit exist
  if (
    selectedMeasurements &&
    selectedMeasurements["suit-measure"] &&
    selectedSuit
  ) {
    const selectedSuitMeasurements = selectedMeasurements["suit-measure"];

    const suitDetailsHTML = `
      <h2>${selectedSuit.Name}</h2>
      <p>Price: ${parseFloat(selectedSuit.Price).toFixed(2)}</p>
      <p>Suit ID: ${selectedMeasurements.suitId}</p>
    `;
    suitDetailsElement.innerHTML = suitDetailsHTML;

    // Display the suit image
    const suitImageHTML = `<img src="${
      "https://suitsdevital.com/suitsdevadmin/" +
      JSON.parse(selectedSuit.Image)[0].name
    }" alt="${selectedSuit.Name}" width="300">`;
    suitImageElement.innerHTML = suitImageHTML;

    // Populate the measurements form
    const measurementForm = document.getElementById("measurement-form");
    const fields = [
      "chest",
      "overArm",
      "waist",
      "hip",
      "neck",
      "sleeve",
      "height",
      "weight",
    ];

    fields.forEach((field) => {
      const inputElement = measurementForm.querySelector(`#${field}`);
      if (inputElement) {
        inputElement.value = selectedSuitMeasurements[field];
      }
    });

    // Set the coupon code
    document.getElementById("couponCode").value =
      selectedMeasurements.couponCode || "";
  } else {
    suitDetailsElement.innerHTML = "<p>No suit measurements selected.</p>";
    suitImageElement.innerHTML = ""; // Clear the suit image if no suit is selected
  }
}

// Event listener for the finalize button
document.getElementById("finalize-button").addEventListener("click", () => {
  // Get values from the measurements form
  const chest = document.getElementById("chest").value;
  const overArm = document.getElementById("overArm").value;
  const waist = document.getElementById("waist").value;
  const hip = document.getElementById("hip").value;
  const neck = document.getElementById("neck").value;
  const sleeve = document.getElementById("sleeve").value;
  const height = document.getElementById("height").value;
  const weight = document.getElementById("weight").value;
  const couponCode = document.getElementById("couponCode").value;
  const specialInstructions = document.getElementById(
    "specialInstructions"
  ).value;

  // Retrieve selected measurements and suit from sessionStorage
  const selectedMeasurements = JSON.parse(
    sessionStorage.getItem("selectedMeasurements")
  );
  const selectedSuit = JSON.parse(sessionStorage.getItem("selectedSuit"));
  // Create the object as specified
  const finalObject = {
    suitMeasure: {
      id: selectedSuit.id,
      name: selectedSuit.name,
      chest,
      overArm,
      waist,
      hip,
      neck,
      sleeve,
      height,
      weight,
      specialInstructions,
    },
    couponCode,
  };

  // Store the final object in sessionStorage
  sessionStorage.setItem("finalObject", JSON.stringify(finalObject));

  // Redirect to the address page (update the URL to your address page)
  window.location.href = "../address-page/"; // Update to your actual address page URL
});

// Load and display selected suit and measurements on page load
window.addEventListener("load", () => {
  loadSuitAndMeasurements();
});
