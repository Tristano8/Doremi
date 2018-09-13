import { createStore } from 'redux';
import musicPad from '../reducers/musicPad';

const store = createStore(musicPad);

console.log(store.getState())

export default store;