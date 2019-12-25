import store from "../store";
import {
	ADD_PRODUCT,
	API_URL, DELETED_PRODUCT,
	ENTER_SEARCH,
	GOT_PRODUCTS,
	GOT_SPECIFIC_PRODUCT
} from "../../services/constants";
import {push} from "connected-react-router";



export const getProducts = () => {
	return dispatch => {
		dispatch({type: 'GETTING_PRODUCTS'});
		const requestOptions = {
			method: 'GET',
			headers: { 'Content-Type': 'application/json'},
		};
		fetch(`${API_URL}/products`, requestOptions)
			.then(res => {
				if (res.ok) {
					return res.json();
				} else {
					res.text().then(text => console.log(text));
				}
			})
			.then(res => {
				dispatch({type: GOT_PRODUCTS, products: res})
			})
			.catch(err => console.error(err));
	}
};
export const getSpecificProduct = (id) => {
	return dispatch => {
		dispatch({type: 'GETTING_SPECIFIC_PRODUCT'});
		const requestOptions = {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' },
		};
		fetch(`${API_URL}/products/${id}`, requestOptions)
			.then(res => {
				if (res.ok) {
					return res.json();
				} else {
					res.text().then(text => console.log(text));
				}
			})
			.then(res => {
				dispatch({type: GOT_SPECIFIC_PRODUCT, single: res});
			})
			.catch(err => console.error(err));
	};
};
export const addProduct = (product) => {
	return dispatch => {
		dispatch({type: 'ADDING_PRODUCT'});
		const token = store.getState().defaults.user.token;
		const user = store.getState().defaults.user.id;
		const prod = {...product, user: user};
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json', 'token': `${token}` },
			body: JSON.stringify(prod)
		};
		fetch(`${API_URL}/products`, requestOptions)
			.then(res => {
				if (res.ok) {
					return res.json();
				} else {
					res.text().then(text => console.log(text));
				}
			})
			.then(res => {
				dispatch({type: ADD_PRODUCT, product: {...res, user: user}});
				dispatch(push('/'));
			})
			.catch(err => console.error(err));
	};
};
export const searchProduct = (query) => {
	return dispatch => {
		dispatch({type: ENTER_SEARCH, query: query})
	}
};
export const deleteProduct = (product) => {
	return dispatch => {
		dispatch({type: 'DELETING_PRODUCT'});
		const token = store.getState().defaults.user.token;
		const requestOptions = {
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json', 'token': `${token}` },
		};
		fetch(`${API_URL}/products/${product._id}`, requestOptions)
			.then(res => {
				if (res.ok) {
					return res.json();
				} else {
					res.text().then(text => console.log(text));
				}
			})
			.then(res => {
				dispatch({type: DELETED_PRODUCT, product: {product}});
				dispatch(push('/'));
			})
			.catch(err => console.error(err));
	};
};