import { TCar } from '@libs/models/main';
import { createReducer, ActionType } from 'typesafe-actions';
import * as actions from './actions';

export type Actions = ActionType<typeof actions>;

export type TProductReducer = {
  carDetail: TCar | null;
  isLoadingCarDetail: boolean;
};

export const initialState: TProductReducer = {
  carDetail: null,
  isLoadingCarDetail: false,
};

const productReducer = createReducer<TProductReducer, Actions>(initialState, {
  [actions.GET_CAR_REQUEST]: state => ({
    ...state,
    isLoadingCarDetail: true,
  }),
  [actions.GET_CAR_SUCCESS]: (state, action) => ({
    ...state,
    carDetail: action.payload,
    isLoadingCarDetail: false,
  }),
  [actions.GET_CAR_FAILURE]: state => ({
    ...state,
    isLoadingCarDetail: false,
  }),
});

export default productReducer;
