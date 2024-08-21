import { all } from 'redux-saga/effects';
import watcherSaga from '../sagas/Saga';
// import dataSaga from './dataSaga';

//Parallel Watchers:  watchers are set up within the same rootSaga, they run in parallel. 
// This setup allows your application to handle multiple different actions simultaneously without blocking or interfering with one another.
export default function* rootSaga() {
    yield all([
        watcherSaga(),
        // dataSaga(),
        // Add other sagas here
    ]);
}



