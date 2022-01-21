'use strict';
import util from 'util';
import * as crypto from 'crypto';

const atob = input => Buffer.from(input, 'base64');
const btoa = input => input.toString('base64').replace(/\=+$/, '');

const h = util.promisify(crypto.pbkdf2);
const pbkdf2 = (input, salt) => h(input, salt, 100000, 16, 'sha512');

const gs = util.promisify(crypto.randomBytes);

const normalize = (str: string) => Buffer.from(String(str).normalize('NFKC'));

const generateSalt = () => gs(16);

export const hash = async (credentials: string) => {
    const salt = await generateSalt();
    const result = await pbkdf2(normalize(credentials), salt);

    return `${btoa(salt)}.${btoa(result)}`;
};

export const compare = async (hash: string, credentials: string) => {
    if (typeof hash !== 'string') return false; // invalid input
    if (typeof credentials !== 'string') return false; // invalid input
    if (hash.length > 120) return false; // hash is impossibly long

    const [salt, result] = hash.split('.');
    const result2 = await pbkdf2(normalize(credentials), atob(salt));

    return result === btoa(result2);
};