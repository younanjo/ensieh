require('dotenv').config({
  path: process.env.DOTENV_PATH || '.env',
});

import env from './env';

type IConfig = {
  ENV: any;
};

const config: IConfig = {
  ENV: env,
};

export default config;
