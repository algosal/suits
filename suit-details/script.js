// script.js

$(document).ready(function () {
  const urlParams = new URLSearchParams(window.location.search);
  const suitId = urlParams.get("id");
  console.log(suitId);
  // Fetch suit details including the image from an API using suitId
  $.ajax({
    url: `https://suitsdevital.com/automation/onesuitonid/getoneRecord.php?id=${suitId}`, // Replace with your API endpoint
    method: "GET",
    success: function (data_from_server) {
      // Assuming the API response provides suit details and image URL
      let data = JSON.parse(data_from_server);
      console.log(data);
      console.log(JSON.parse(data.Image)[0].name);
      const suit = {
        id: data.id,
        name: data.Name,
        value: data.value,
        price: data.Price,
        imageUrl:
          "https://suitsdevital.com/suitsdevadmin/" +
          JSON.parse(data.Image)[0].name, // Replace with the actual image URL field from your API response
      };

      // Display suit details on the page
      $(".suit-name").text(suit.name);
      $(".suit-value").text(suit.value);
      $(".suit-price").text("$ " + parseFloat(suit.price).toFixed(2));

      // Display the suit image
      if (suit.imageUrl) {
        $(".suit-image").attr("src", suit.imageUrl);
      }
    },
    error: function () {
      // Handle errors if the API request fails
      console.error("Failed to fetch suit details.");
    },
  });
  let back_button = document.getElementById("back-button");
  back_button.addEventListener(
    "click",
    () => (window.location.href = "https://suitsdevital.com")
  );
});
