import {createStore} from 'redux';
import appReducer from './reducers/rootReducer';

const store = createStore(appReducer);

export default store;
