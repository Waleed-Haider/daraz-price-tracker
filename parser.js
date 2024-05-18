const nightmare = require("nightmare")();
const arguments = process.argv.slice(2);
const url = arguments[0];

checkPrice();

async function checkPrice() {
  const priceString = await nightmare
    .goto(url)
    .wait("#module_product_price_1")
    .evaluate(() => {
      const texts = [];
      texts.push(
        document
          .getElementById("module_product_title_1")
          .innerText.trim()
          .replace(/\n/g, "")
      );
      texts.push(
        document
          .getElementById("module_product_price_1")
          .innerText.trim()
          .replace("Rs. ", "")
          .replace(/\n/g, "")
      );
      return texts;
    })
    .end();
  console.log(priceString.join("~,~"));
}
