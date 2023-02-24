import { CombinedState, combineReducers } from 'redux';
import { HYDRATE } from 'next-redux-wrapper';
import { all, fork } from 'redux-saga/effects';
import { TUserReducer } from './user/reducers';
import { TMainReducer } from './main/reducers';
import { TProductReducer } from './product/reducers';
import { TToastReducer } from './toast/reducers';
import user from './user';
import main from './main';
import product from './product';
import toast from './toast';

interface IState {
  user: TUserReducer;
  main: TMainReducer;
  product: TProductReducer;
  toast: TToastReducer;
}

const rootReducer = (state: IState | undefined, action: any): CombinedState<IState> => {
  switch (action.type) {
    default: {
      const combineReducer = combineReducers({
        user: user.reducer,
        main: main.reducer,
        product: product.reducer,
        toast: toast.reducer,
      });
      return combineReducer(state, action);
    }
  }
};

function* rootSaga() {
  yield all([fork(main.saga), fork(user.saga), fork(product.saga)]);
}

export type RootState = ReturnType<typeof rootReducer>;

export default {
  rootReducer: rootReducer,
  rootSaga: rootSaga,
};
