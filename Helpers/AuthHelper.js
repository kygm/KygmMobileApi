const jwt = require("jsonwebtoken");

export function verifyToken(input) {
  authorized = jwt.verify(token, "842BD4ED27D41A82770BE39EB5A282CE37DD28A589F37D72D16C43AFF03379A8");
  if (authorized == undefined) {
    return false;
  }
  else {
    return authorized;
  }
}