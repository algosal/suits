document.addEventListener("DOMContentLoaded", function () {
  const selectedMeasurements = JSON.parse(
    sessionStorage.getItem("selectedMeasurements")
  );

  if (!selectedMeasurements) {
    alert(
      "Selected measurements not found. Please go back to select measurements."
    );
    window.location.href = "index.html";
  } else {
    // Event listener for the apply button
    document
      .getElementById("apply-button")
      .addEventListener("click", function () {
        const couponCode = document.getElementById("coupon").value;

        if (couponCode.toLowerCase() === "default") {
          // Apply default coupon and redirect to final payment page
          selectedMeasurements.couponCode = "default";
          sessionStorage.setItem(
            "selectedMeasurements",
            JSON.stringify(selectedMeasurements)
          );
          window.location.href = "final-payment.html";
        } else {
          // Apply user-entered coupon code
          // You can fetch the coupon details and price from an API here
          // For demonstration purposes, we'll simulate fetching the price
          // Replace this with your actual API request

          selectedMeasurements.couponCode = couponCode;
          sessionStorage.setItem(
            "selectedMeasurements",
            JSON.stringify(selectedMeasurements)
          );

          const apiUrl = `https://your-coupon-api.com/coupon?code=${couponCode}`;

          fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
              if (data.valid) {
                selectedMeasurements.couponCode = couponCode;
                selectedMeasurements.price = data.discountedPrice; // Update the price
                sessionStorage.setItem(
                  "selectedMeasurements",
                  JSON.stringify(selectedMeasurements)
                );
                window.location.href = "final-payment.html";
              } else {
                alert("Invalid coupon code. Please try again.");
              }
            })
            .catch((error) => {
              console.error("Error fetching coupon details:", error);
              alert(
                "An error occurred while fetching coupon details. Please try again later."
              );
            });
        }
      });
  }
});
