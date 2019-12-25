import {LOGGED_OUT, MESSAGE, SUCCESS_LOGIN, UPDATE_PHOTO} from "../../services/constants";

const SETTINGS = {
	logged: false,
	message: '',
	user: {}
};
export const defaults = (store = SETTINGS, {type, message, user}) => {
		switch (type) {
			case MESSAGE:
				return {...store, message: message};
			case SUCCESS_LOGIN:
				return {...store, user: user, logged: true};
			case LOGGED_OUT:
				return {...store, logged: false, user: {}};
			case UPDATE_PHOTO:
				return {...store, user: user};
			default:
				return store
		}
} ;