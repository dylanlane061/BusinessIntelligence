import data from './data.json';
import {Company} from './types';

export const delay = (time: number) =>
  new Promise(resolve => setTimeout(resolve, time));

export const getCompanies = async () => {
  await delay(5000);
  return data as Company[];
};

export const getCompany = async (id: number) => {
  await delay(5000);
  return data.find(company => company.id === id);
};
