import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga'; //
import rootReducer from '../reducers/rootReducer';
import rootSaga from '../sagas/RootSaga'

const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
    reducer: rootReducer, // Pass the combined rootReducer directly
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),//connects the Saga middleware to Redux.
});

sagaMiddleware.run(rootSaga); //starts the rootSaga.

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;


