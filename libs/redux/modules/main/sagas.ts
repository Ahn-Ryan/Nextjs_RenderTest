import { fork, all, takeLatest, call, put } from 'redux-saga/effects';
import * as actions from './actions';
import * as types from './types';
import * as apis from './apis';
import { PayloadAction } from 'typesafe-actions';

function* getBrandsSaga() {
  try {
    const result: types.TBrandsRes = yield call(apis.getBrandsApi);
    yield put({
      type: actions.GET_BRANDS_SUCCESS,
      payload: result,
    });
  } catch (e) {
    yield put({
      type: actions.GET_BRANDS_FAILURE,
      error: e,
    });
  }
}
function* watchBrands() {
  yield takeLatest(actions.GET_BRANDS_REQUEST, getBrandsSaga);
}

function* getModelGroupsSaga(
  action: PayloadAction<'GET_MODEL_GROUPS_REQUEST', types.TModelGroupsReq>,
) {
  try {
    const result: types.TModelGroupsRes = yield call(apis.getModelGroupsApi, action.payload);
    yield put({
      type: actions.GET_MODEL_GROUPS_SUCCESS,
      payload: result,
    });
  } catch (e) {
    yield put({
      type: actions.GET_MODEL_GROUPS_FAILURE,
      error: e,
    });
  }
}
function* watchModelGroups() {
  yield takeLatest(actions.GET_MODEL_GROUPS_REQUEST, getModelGroupsSaga);
}

function* getModelsSaga(action: PayloadAction<'GET_MODELS_REQUEST', types.TModelsReq>) {
  try {
    const result: types.TModelsRes = yield call(apis.getModelsApi, action.payload);
    yield put({
      type: actions.GET_MODELS_SUCCESS,
      payload: result,
    });
  } catch (e) {
    yield put({
      type: actions.GET_MODELS_FAILURE,
      error: e,
    });
  }
}
function* watchModels() {
  yield takeLatest(actions.GET_MODELS_REQUEST, getModelsSaga);
}

function* getCarsSaga(action: PayloadAction<'GET_CARS_REQUEST', types.TCarsReq>) {
  try {
    const result: types.TCardRes = yield call(apis.getCarsApi, action.payload);
    yield put({
      type: actions.GET_CARS_SUCCESS,
      payload: result,
    });
  } catch (e) {
    yield put({
      type: actions.GET_CARS_FAILURE,
      error: e,
    });
  }
}
function* watchCars() {
  yield takeLatest(actions.GET_CARS_REQUEST, getCarsSaga);
}

export default function* mainSaga() {
  yield all([fork(watchBrands), fork(watchModelGroups), fork(watchModels), fork(watchCars)]);
}
