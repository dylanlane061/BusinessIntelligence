import data from './data.json';
import {Company} from '~types';

export const delay = (time: number) =>
  new Promise(resolve => setTimeout(resolve, time));

export const weightedCoinFlip = (failChance: number) =>
  Math.random() > failChance / 100;

export const getCompanies = async () => {
  await delay(2000);

  const success = weightedCoinFlip(70);

  if (success) {
    return data as Company[];
  }

  throw new Error('Just simulating an error, please retry!');
};
