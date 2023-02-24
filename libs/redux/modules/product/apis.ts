import axios from 'axios';
import { addUserAccessToken } from '@libs/utils/sessionHelper';
import * as actions from './actions';
import * as types from './types';

export async function getCarApi(payload: types.TCarReq) {
  try {
    const response = await axios.get(`${actions.GET_CAR_URL}${payload.car_id}/`, {
      headers: addUserAccessToken(),
    });
    const result: types.TCarRes = response.data;
    return result;
  } catch (e) {
    throw new Error(e as any);
  }
}
