import { PayloadAction } from 'typesafe-actions';
import { fork, all, takeLatest, call, put } from 'redux-saga/effects';
import * as actions from './actions';
import * as types from './types';
import * as apis from './apis';

function* getCarSaga(action: PayloadAction<'GET_MODEL_GROUPS_REQUEST', types.TCarReq>) {
  try {
    const result: types.TCarRes = yield call(apis.getCarApi, action.payload);
    yield put({
      type: actions.GET_CAR_SUCCESS,
      payload: result,
    });
  } catch (e) {
    yield put({
      type: actions.GET_CAR_FAILURE,
      error: e,
    });
  }
}
function* watchCar() {
  yield takeLatest(actions.GET_CAR_REQUEST, getCarSaga);
}

export default function* productSaga() {
  yield all([fork(watchCar)]);
}
