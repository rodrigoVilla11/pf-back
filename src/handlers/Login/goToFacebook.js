require("dotenv").config();
const axios = require("axios");
const goToFacebook = async (req, res) => {
  const redirectUri =
    "pf-back-sixcirlces-production.up.railway.app/auth/facebook/callback";
  const scope = ["email"];
  const authUrl = `https://www.facebook.com/v14.0/dialog/oauth?client_id=${
    process.env.FACEBOOK_CLIENT_ID
  }&redirect_uri=${redirectUri}&scope=${scope.join(",")}`;
  res.redirect(authUrl);
};
module.exports = goToFacebook;
