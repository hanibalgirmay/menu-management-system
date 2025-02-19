import axiosInstance from './axiosInstance';
import { MenuNode, CreateMenuPayload } from '../types/types';

export const fetchMenu = async (): Promise<MenuNode[]> => {
  const response = await axiosInstance.get('/tree-node');
  // if (response.status !== 200) {
  //   throw new Error('Network response was not ok');
  // }
  console.log('fetching api data.......___', response);
// @ts-ignore
  return response;
};

export const getMenuData = async (id: string): Promise<MenuNode> => {
  const response = await axiosInstance.get(`/tree-node/hierarchy/${id}`);
  // @ts-ignore
  return response;
};

export const createMenu = async (
  data: CreateMenuPayload,
): Promise<MenuNode> => {
  const response = await axiosInstance.post('/tree-node', data);
  // @ts-ignore
  return response;
};
