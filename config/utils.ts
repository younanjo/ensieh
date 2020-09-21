import { isNil } from 'ramda';

export function readEnvInt (env: any, def: any) {
  return isNil(env) ? def : parseInt(env);
};
