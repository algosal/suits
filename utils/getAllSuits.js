async function getAllSuits() {
  let url_all_products =
    "https://suitsdevital.com/automation/allsuits/allproducts.php";
  return await axios.get(url_all_products).then((d) => {
    console.log(d.data);
    return d.data;
  });
}
