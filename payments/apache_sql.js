let my_apache_object_cleaned = {
  suitMeasure: JSON.parse(sessionStorage.getItem("finaSize")).suitMeasure,
  address: sessionStorage.getItem("address"),
  email: sessionStorage.getItem("email"),
  globalId: "globalId",
  selected_suit: JSON.parse(sessionStorage.getItem("selectedSuit")).id,
  cost: JSON.parse(sessionStorage.getItem("selectedSuit")).Cost,
  tailor_master: JSON.parse(sessionStorage.getItem("selectedSuit"))
    .Tailor_Master,
  apprentice: null,
  test_tailor: null,
};



             my_apache_object_cleaned = {
                "suitMeasure": JSON.parse(sessionStorage.getItem('finaSize')).suitMeasure,
                "coupon_code": JSON.parse(sessionStorage.getItem('finaSize')).couponCode,
                "address": sessionStorage.getItem('address'),
                "email": sessionStorage.getItem('email'),
                "globalId": "globalId5",
                "selected_suit": JSON.parse(sessionStorage.getItem('selectedSuit')).Id,
                "cost": JSON.parse(sessionStorage.getItem('selectedSuit')).Cost,
                "tailor_master": JSON.parse(sessionStorage.getItem('selectedSuit')).Tailor_Master,
                "apprentice": null,
                "test_tailor": null,
                "final_price":JSON.parse(sessionStorage.getItem('finalPrice')),
                "commission":  JSON.parse(sessionStorage.getItem('selectedSuit')).Commission,
            }
console.log(" I am in the script");
let apache_url = "https://suitsdevital.com/automation/saveorder/index.php";
console.log(
  "the object is going to go to the php file as ",
  my_apache_object_cleaned
);
axios.post(apache_url, my_apache_object_cleaned).then((d) => {
  console.log(d);
});
