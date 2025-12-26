import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT;
const tokenSecretKey = process.env.TOKEN_SECRET_KEY;
const tokenExpiryTime = process.env.TOKEN_EXPIRY_TIME;
const ownerEmailId = process.env.OWNER_EMAIL_ID;
const ownerEmailPasscode = process.env.OWNER_EMAIL_PASSCODE;
const ownerName = process.env.OWNER_NAME;

export {port,tokenSecretKey, tokenExpiryTime,ownerEmailId,ownerEmailPasscode,ownerName};
