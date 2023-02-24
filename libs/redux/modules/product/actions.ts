import { AxiosError } from 'axios';
import { createAsyncAction } from 'typesafe-actions';
import * as types from './types';

const API_HOST = 'http://localhost:8000/api/v2';

export const GET_CAR_URL = `${API_HOST}/cars/`;
export const GET_CAR_REQUEST = 'GET_CAR_REQUEST';
export const GET_CAR_SUCCESS = 'GET_CAR_SUCCESS';
export const GET_CAR_FAILURE = 'GET_CAR_FAILURE';
export const getCarAction = createAsyncAction(GET_CAR_REQUEST, GET_CAR_SUCCESS, GET_CAR_FAILURE)<
  types.TCarReq,
  types.TCarRes,
  AxiosError
>();
