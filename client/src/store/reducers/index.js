import {combineReducers} from "redux";
import { connectRouter } from 'connected-react-router'
import {defaults} from "./mainReducer";
import {products} from "./productsReducer";

const rootReducer = (history) => combineReducers({
	router: connectRouter(history),
	defaults, products
});
export default rootReducer;