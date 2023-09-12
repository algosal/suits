import sizes from "./sizes.js"; // Import the sizes array

$(document).ready(async function () {
  const urlParams = new URLSearchParams(window.location.search);
  const suitId = urlParams.get("id");

  // Sample array of suit objects
  let suits = [
    // Your suit objects here
  ];

  console.log(suitId);
  suits = await getOneSuit(suitId).then((suits) => {
    console.log(suits);

    // Function to display suit details and size options
    function displaySuitDetails(suit) {
      $("#suit-image").attr(
        "src",
        "https://suitsdevital.com/suitsdevadmin/" +
          JSON.parse(suit.Image)[0].name
      );
      $(".suit-details").html(`<h2>${suit.Name}</h2>`);

      // Create size options
      const sizeOptions = sizes.map((size) => {
        return `<div class="coat-size-option" data-size="${size.id}">${size.name}</div>`;
      });

      $(".coat-sizes").html(sizeOptions.join(""));
    }

    console.log(suits);

    // Find the suit based on suitId
    const selectedSuit = suits;
    //   .find((suit) => {
    //   console.log(suit);
    //   return suit.id == suitId;
    // });

    if (selectedSuit) {
      displaySuitDetails(selectedSuit);

      // Event handler for selecting a size
      $(".coat-size-option").on("click", function () {
        const selectedSizeId = $(this).data("size");
        const selectedSize = sizes.find((size) => size.id == selectedSizeId);
        const suitMeasurements = {
          suitId: suitId,
          "suit-measure": selectedSize,
        };

        // Store the selected information in session storage
        sessionStorage.setItem(
          "selectedSuit",
          JSON.stringify(selectedSuit) // Store the selected suit
        );

        sessionStorage.setItem(
          "selectedMeasurements",
          JSON.stringify(suitMeasurements)
        );

        // Redirect to measurements-confirmation.html
        window.location.href = "../measurements-confirmation/";
      });
    } else {
      $(".suit-details").html("<p>Suit not found.</p>");
    }

    return suits;
  });
});
