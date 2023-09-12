$(document).ready(function () {
  // Retrieve suit data asynchronously
  getAllSuits().then(function (suits) {
    // Populate the suit cards
    suits.map(function (suit) {
      // console.log(JSON.parse(suit.image)[0].name);
      const suitCard = `
            <div class="suit-card">
                <img class="suit-image" src="${
                  "https://suitsdevital.com/suitsdevadmin/" +
                  JSON.parse(suit.image)[0].name
                }" alt="${suit.name}">
                <h3>${suit.name}</h3>
                <p class="suit-price">${parseFloat(suit.price).toFixed(2)}</p>
                <button class="buy-button" data-suit-id="${
                  suit.id
                }">Buy</button>
            </div>
        `;
      $("#suit-container").append(suitCard);
    });

    // Add click event handler for Buy buttons
    $(".buy-button").on("click", function () {
      const suitId = $(this).data("suit-id");
      window.location.href = `make-suit/index.html?id=${encodeURIComponent(
        suitId
      )}`;
    });
  });
});
