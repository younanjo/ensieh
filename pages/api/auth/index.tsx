// import { omit } from 'ramda';
// import config from '../../config';
import {
  // UnauthorizedResponse,
  UnprocessableEntityResponse,
} from '../../../exceptions';
// import { encryptString } from '../../utils';
import { LoginValidator } from '../../../validators';

export async function validateRequest(req: any) {
  const { value, error } = LoginValidator(req.body);

  console.log(value);
  if (error) {
    throw new UnprocessableEntityResponse(error);
  }
}

async function handler(req: any, res: any) {
  // Run the middleware here
  await validateRequest(req);

  // FIXME
  res.json({ message: 'Hello Everyone!' });
}

export default handler;
