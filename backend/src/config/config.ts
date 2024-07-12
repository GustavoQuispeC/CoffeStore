import { config as dotenvConfig } from 'dotenv';

dotenvConfig({ path: '.env.development' });

export default {
  mercadoPago: {
    accessToken: process.env.TOKENMARKETPAY,
  },
};
