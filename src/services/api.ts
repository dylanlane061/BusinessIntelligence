import data from './data.json';
import {Company} from '../types';

export const delay = (time: number) =>
  new Promise(resolve => setTimeout(resolve, time));

export const getCompanies = async () => {
  await delay(2000);
  return data as Company[];
};
