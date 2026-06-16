import fs from 'fs';

export const privateKey = fs.readFileSync('./../private.key', 'utf-8');

export const publicKey = fs.readFileSync('./../public.key', 'utf-8');