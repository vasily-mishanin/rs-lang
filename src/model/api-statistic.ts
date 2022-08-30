import { IUserStatistic, IUserStats } from './app-types';

import { API_ENDPOINT } from '@/model/constants';

// Get user's statistic
export async function getUserStatistic (userId:string, token:string){

  const url = `${API_ENDPOINT}/users/${userId}/statistics`;
  const method = 'GET';
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  };

  const response = await fetch(url, { method, headers });

  if (response.status === 200) {
    return await response.json() as IUserStatistic;
  }

  throw new Error(response.status.toString());

}

// Update user's statistic

export async function updateUserStatistic (userId:string, token:string, newStats: IUserStatistic){

  const url = `${API_ENDPOINT}/users/${userId}/statistics`;
  const method = 'PUT';
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  };
  const body = JSON.stringify(newStats);

  const response = await fetch(url, { method, headers, body });

  if (response.status === 200) {
    return await response.json() as IUserStatistic;
  }

  throw new Error(response.status.toString());

}

// Partial update user's statistic

export async function setUserStatistic (userId:string, token: string, stats: IUserStats) {

  const currentStatistic = await getUserStatistic(userId, token);
  const newStatistic = { ...currentStatistic };

  newStatistic.optional =  Object.assign(currentStatistic.optional, stats);

  await updateUserStatistic(userId, token, newStatistic);

}
