const crypto = require("crypto");

function generateSdnToken() {
  const random = crypto.randomBytes(4).toString("hex"); // 8 chars
  return `sdn_${random}`;
}

module.exports = {
  generateSdnToken,
};
