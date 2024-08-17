import { all } from 'redux-saga/effects';
import watcherSaga from '../sagas/Saga';
// import dataSaga from './dataSaga';

export default function* rootSaga() {
    yield all([
        watcherSaga(),
        // dataSaga(),
        // Add other sagas here
    ]);
}




