import crypto from 'crypto';
import cryptr from 'cryptr';

export const randomIntFromInterval = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const CHARS = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
export const generateRandomString = (
  length: number,
  charSet: string = CHARS
) => {
  const byteArray = crypto.randomBytes(length);

  let index: number;
  let result = [];
  for (var i = 0; i < byteArray.length; i++) {
    index = byteArray[i] % charSet.length;
    result.push(charSet[index]);
  }

  return result.join('');
};

// Our "secret" isn't so secret ay
const encoder = new cryptr(
  'C8Fv@92nXEp8Pj6Bk73%rvB7FEvM#aZ@fvA!9na$M7SYkSRNgEDh'
);

// Encrypt a given raw string
export const encryptString = (str: string) => {
  return encoder.encrypt(str);
};

// Decrypt a given encoded string
export const decryptString = (encodedString: string) => {
  return encoder.decrypt(encodedString);
};
