import * as dotenv from 'dotenv';
import path from 'path';

// Parsing the env file.
if (process.env.NODE_ENV === 'production') {
  const pmPath = process.env.pm_exec_path;
  if (pmPath) {
    const envPath = path.resolve(pmPath.slice(0, -22), '.env');
    dotenv.config({
      path: envPath,
    });
  }
} else {
  dotenv.config();
}

// Interface to load env variables
// Note these variables can possibly be undefined
// as someone could skip these variables or not setup a .env file at all

interface ENV {
  NODE_ENV: string | undefined;
  PORT: number | undefined;
  APP_NAME: string | undefined;
}

interface Config {
  NODE_ENV: string;
  PORT: number;
  APP_NAME: string;
}

// Loading process.env as ENV interface

const getConfig = (): ENV => {
  return {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT ? Number(process.env.PORT) : undefined,
    APP_NAME: process.env.APP_NAME,
  };
};

// Throwing an Error if any field was undefined we don't
// want our app to run if it can't connect to DB and ensure
// that these fields are accessible. If all is good return
// it as Config which just removes the undefined from our type
// definition.

const getSanitizedConfig = (config: ENV): Config => {
  for (const [key, value] of Object.entries(config)) {
    if (value === undefined) {
      throw new Error(`Missing key ${key} in .env file`);
    }
  }
  return config as Config;
};

const config = getConfig();

const sanitizedConfig = getSanitizedConfig(config);

export default sanitizedConfig;
