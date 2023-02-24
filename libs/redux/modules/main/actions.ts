import { AxiosError } from 'axios';
import { createAction, createAsyncAction, EmptyAction } from 'typesafe-actions';
import * as types from './types';

const API_HOST = 'http://localhost:8000/api/v2';

export const INIT_MAIN = 'INIT_MAIN';
export const initMain = createAction(INIT_MAIN)();

export const INIT_MODELS = 'INIT_MODELS';
export const initModels = createAction(INIT_MODELS)();

export const GET_BRANDS_URL = `${API_HOST}/brands/`;
export const GET_BRANDS_REQUEST = 'GET_BRANDS_REQUEST';
export const GET_BRANDS_SUCCESS = 'GET_BRANDS_SUCCESS';
export const GET_BRANDS_FAILURE = 'GET_BRANDS_FAILURE';
export const getBrandsAction = createAsyncAction(
  GET_BRANDS_REQUEST,
  GET_BRANDS_SUCCESS,
  GET_BRANDS_FAILURE,
)<EmptyAction<any>, types.TBrandsRes, AxiosError>();

export const GET_MODEL_GROUPS_URL = `${API_HOST}/brands/`;
export const GET_MODEL_GROUPS_REQUEST = 'GET_MODEL_GROUPS_REQUEST';
export const GET_MODEL_GROUPS_SUCCESS = 'GET_MODEL_GROUPS_SUCCESS';
export const GET_MODEL_GROUPS_FAILURE = 'GET_MODEL_GROUPS_FAILURE';
export const getModelGroupsAction = createAsyncAction(
  GET_MODEL_GROUPS_REQUEST,
  GET_MODEL_GROUPS_SUCCESS,
  GET_MODEL_GROUPS_FAILURE,
)<types.TModelGroupsReq, types.TModelGroupsRes, AxiosError>();

export const GET_MODELS_URL = `${API_HOST}/model_groups/`;
export const GET_MODELS_REQUEST = 'GET_MODELS_REQUEST';
export const GET_MODELS_SUCCESS = 'GET_MODELS_SUCCESS';
export const GET_MODELS_FAILURE = 'GET_MODELS_FAILURE';
export const getModelsAction = createAsyncAction(
  GET_MODELS_REQUEST,
  GET_MODELS_SUCCESS,
  GET_MODELS_FAILURE,
)<types.TModelsReq, types.TModelsRes, AxiosError>();

export const GET_CARS_URL = `${API_HOST}/cars/`;
export const GET_CARS_REQUEST = 'GET_CARS_REQUEST';
export const GET_CARS_SUCCESS = 'GET_CARS_SUCCESS';
export const GET_CARS_FAILURE = 'GET_CARS_FAILURE';
export const getCarsAction = createAsyncAction(
  GET_CARS_REQUEST,
  GET_CARS_SUCCESS,
  GET_CARS_FAILURE,
)<types.TCarsReq, types.TCardRes, AxiosError>();
