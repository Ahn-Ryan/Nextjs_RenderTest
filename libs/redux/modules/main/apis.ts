import axios from 'axios';
import { addUserAccessToken } from '@libs/utils/sessionHelper';
import * as actions from './actions';
import * as types from './types';

export async function getBrandsApi() {
  try {
    const response = await axios.get(`${actions.GET_BRANDS_URL}`, {
      headers: addUserAccessToken(),
    });
    const result: types.TBrandsRes = response.data;
    return result;
  } catch (e) {
    throw new Error(e as any);
  }
}

export async function getModelGroupsApi(payload: types.TModelGroupsReq) {
  try {
    const response = await axios.get(
      `${actions.GET_MODEL_GROUPS_URL}${payload.brand_id}/model_groups/`,
      {
        headers: addUserAccessToken(),
      },
    );
    const result: types.TModelGroupsRes = response.data;
    return result;
  } catch (e) {
    throw new Error(e as any);
  }
}

export async function getModelsApi(payload: types.TModelsReq) {
  try {
    const response = await axios.get(`${actions.GET_MODELS_URL}${payload.model_group_id}/models/`, {
      headers: addUserAccessToken(),
    });
    const result: types.TModelsRes = response.data;
    return result;
  } catch (e) {
    throw new Error(e as any);
  }
}

export async function getCarsApi(payload: types.TCarsReq) {
  try {
    const response = await axios.get(
      `${actions.GET_CARS_URL}${
        payload.type !== 'all'
          ? '?' +
            payload.type +
            '=' +
            payload.id +
            '&order=' +
            payload.order +
            '&page=' +
            payload.page
          : ''
      }`,
      {
        headers: addUserAccessToken(),
      },
    );
    const result: types.TModelsRes = response.data;
    return result;
  } catch (e) {
    throw new Error(e as any);
  }
}
