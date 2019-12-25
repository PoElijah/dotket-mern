import {MESSAGE, API_URL, SUCCESS_LOGIN, LOGGED_OUT} from "../../services/constants";
import { push } from 'connected-react-router';
import Cookies from 'js-cookie'

// Registration
export const register = (user) => {
	return dispatch => {
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(user)
		};
		console.log('reg');
		return fetch(`${API_URL}/register`, requestOptions)
			.then((res) => {
				if (res.ok) {
					res.text().then(text => {
						console.log(text);
						dispatch({type: MESSAGE, message: 'Success'});
						dispatch(push('/'))
					});
				} else {
					res.text().then(text => {
						console.log(text);
						dispatch({type: MESSAGE, message: text})
					});

				}
			})
			.catch((err) => console.error(err));
	}
};
// Login
export const logIn = (login, password) => {
	return dispatch => {
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({email: login, password: password})
		};
		return fetch(`${API_URL}/login`, requestOptions)
			.then((res) => {
				if (res.ok) {
					res.text()
						.then(text => JSON.parse(text))
						.then(text => {

						Cookies.set('__session', text.token);
						dispatch({type: SUCCESS_LOGIN, user: text.user});
						dispatch({type: MESSAGE, message: 'Success'});
					});
				} else {
					res.text().then(text => {
						console.log(text);
						dispatch({type: MESSAGE, message: text})
					});

				}
			})
			.catch((err) => console.error(err));
	}
};
//Authenticate
export const auth = (token) => {
	return dispatch => {
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json', 'token': token },
		};
		fetch(`${API_URL}/login/me`, requestOptions)
			.then( res => {
				if (res.ok) {
					res.text()
						.then(text => JSON.parse(text))
						.then(text => {
							dispatch({type: SUCCESS_LOGIN, user: text});
							dispatch({type: MESSAGE, message: 'Success'});
						})
						.catch(err => console.error(err))
				} else {
					Cookies.remove('__session');
				}
			})
	}
};
//Logout
export const logOut = () => {
	return dispatch => {
		Cookies.remove('__session');
		dispatch({type: MESSAGE, message: 'Logged Out'});
		dispatch({type: LOGGED_OUT})
	}
};
// Check login status
export const sessionCheck = () => {
	return dispatch => {
		const jwt = Cookies.get('__session');
		try {
			if (jwt) {
				dispatch(auth(jwt));
			}
		} catch (err) {
			console.log(err)
		}
	}
};
