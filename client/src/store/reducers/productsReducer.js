import {DELETED_PRODUCT, ENTER_SEARCH, GOT_PRODUCTS, GOT_SPECIFIC_PRODUCT} from "../../services/constants";

const PRODUCTS = {
	search: '',
	products: [],
	single: {
		title: 'Example'
	}
};

export const products = (store = PRODUCTS, {type, products, query, single, product}) => {
	switch (type) {
		case GOT_PRODUCTS:
			return  {...store, products: products};
		case ENTER_SEARCH:
			return {...store, search: query};
		case GOT_SPECIFIC_PRODUCT:
			return {...store, single: single};
		case DELETED_PRODUCT:
			const new_store = store.products.splice(store.products.indexOf(product), 1);
			return {...store, products: new_store};
		default:
			return store
	}
} ;