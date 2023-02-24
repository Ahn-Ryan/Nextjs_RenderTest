import { createReducer, ActionType } from 'typesafe-actions';
import { TBrands, TCars, TGroups, TModels } from '@libs/models/main';
import * as actions from './actions';

export type Actions = ActionType<typeof actions>;

export type TMainReducer = {
  brands: TBrands | null;
  groups: TGroups | null;
  models: TModels | null;
  cars: TCars | null;
  isLoadingBrands: boolean;
  isLoadingGroups: boolean;
  isLoadingModels: boolean;
  isLoadingCars: boolean;
};

export const initialState: TMainReducer = {
  brands: null,
  groups: null,
  models: null,
  cars: null,
  isLoadingBrands: false,
  isLoadingGroups: false,
  isLoadingModels: false,
  isLoadingCars: false,
};

const mainReducer = createReducer<TMainReducer, Actions>(initialState, {
  [actions.INIT_MAIN]: () => initialState,
  [actions.INIT_MODELS]: state => ({
    ...state,
    models: null,
  }),
  [actions.GET_BRANDS_REQUEST]: state => ({
    ...state,
    isLoadingBrands: true,
  }),
  [actions.GET_BRANDS_SUCCESS]: (state, action) => ({
    ...state,
    brands: action.payload,
    isLoadingBrands: false,
  }),
  [actions.GET_BRANDS_FAILURE]: state => ({
    ...state,
    isLoadingBrands: false,
  }),
  [actions.GET_MODEL_GROUPS_REQUEST]: state => ({
    ...state,
    isLoadingGroups: true,
  }),
  [actions.GET_MODEL_GROUPS_SUCCESS]: (state, action) => ({
    ...state,
    groups: action.payload,
    isLoadingGroups: false,
  }),
  [actions.GET_MODEL_GROUPS_FAILURE]: state => ({
    ...state,
    isLoadingGroups: false,
  }),
  [actions.GET_MODELS_REQUEST]: state => ({
    ...state,
    isLoadingModels: true,
  }),
  [actions.GET_MODELS_SUCCESS]: (state, action) => ({
    ...state,
    models: action.payload,
    isLoadingModels: false,
  }),
  [actions.GET_MODELS_FAILURE]: state => ({
    ...state,
    isLoadingModels: false,
  }),
  [actions.GET_CARS_REQUEST]: state => ({
    ...state,
    isLoadingCars: true,
  }),
  [actions.GET_CARS_SUCCESS]: (state, action) => ({
    ...state,
    cars: action.payload,
    isLoadingCars: false,
  }),
  [actions.GET_CARS_FAILURE]: state => ({
    ...state,
    isLoadingCars: false,
  }),
});

export default mainReducer;
