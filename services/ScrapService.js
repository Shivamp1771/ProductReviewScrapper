const axios = require("axios");
const cheerio = require("cheerio");

class ScrapService {
  body;
  productLink;
  constructor(productUrl) {
    this.productLink = productUrl;
  }

  async loadProductDetails() {
    this.body = await axios.get(this.productLink, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.157 Safari/537.36",
        headless: true,
      },
    });
  }

  async getProductDetails() {
    const $ = cheerio.load(this.body.data);

    return {
      productLink: this.productLink,
      productImg: $("#landingImage").attr("src"),
      productTitle: $("#productTitle").text().trim(),
      productPrice: $(
        "#corePriceDisplay_desktop_feature_div .priceToPay .a-offscreen"
      )
        .text()
        .trim(),
      productRating: $(
        "#averageCustomerReviews_feature_div #averageCustomerReviews #acrPopover .a-icon.a-icon-star .a-icon-alt"
      )
        .text()
        .trim(),
      productDescription: $(
        "#feature-bullets .a-unordered-list.a-vertical.a-spacing-mini .a-list-item"
      )
        .text()
        .trim(),
    };
  }

  async getReviews() {
    const $ = cheerio.load(this.body.data);
    const reviews = $(".review");
    const postTitles = [];
    reviews.each((i, review) => {
      const textReview = $(review).find(".review-text").text();
      postTitles.push(textReview);
    });

    return postTitles;
  }
}

module.exports = ScrapService;
