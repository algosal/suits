$(document).ready(function () {
  // Sample array of suit objects
  let suits = [
    {
      id: 1,
      name: "Classic Black Suit",
      price: "$299",
      image: "images/suit1.webp",
    },
    {
      id: 2,
      name: "Navy Blue Suit",
      price: "$349",
      image: "images/suit2.jpg",
    },
    {
      id: 3,
      name: "Gray Pinstripe Suit",
      price: "$399",
      image: "images/suit3.jpg",
    },
    {
      id: 4,
      name: "Gray Pinstripe Suit",
      price: "$499",
      image: "images/suit4.jpg",
    },
    // Add more suits as needed
  ];
  
  getAllSuits().then((d) => ({
  // Populate the suit cards
  suits.forEach(function (suit) {
    const suitCard = `
            <div class="suit-card">
                <img class="suit-image" src="${suit.image}" alt="${suit.name}">
                <h3>${suit.name}</h3>
                <p class="suit-price">${suit.price}</p>
                <button class="buy-button" data-suit-id="${suit.id}">Buy</button>
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
}));});
