import { config } from 'dotenv';

const { parsed } = config();

export const {
    SECRET,
    NODE_ENV,
    IN_PROD = NODE_ENV === 'prod'
} = parsed;
