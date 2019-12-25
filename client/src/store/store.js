import { createStore, applyMiddleware } from 'redux';
import { createBrowserHistory } from 'history';
import rootReducer from './reducers/index';
import { routerMiddleware } from 'connected-react-router'
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';

export const history = createBrowserHistory();

const configureStore = preloadState => (
	createStore(
		rootReducer(history),
		preloadState,
		composeWithDevTools(applyMiddleware(
			routerMiddleware(history),
			thunk
		)),
	)
);

const store = configureStore({});

export default store;