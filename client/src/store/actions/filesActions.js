import {API_URL, UPDATE_PHOTO} from "../../services/constants";
import store from './../store'
import axios from 'axios';

export const uploadFiles = (files) => {
	return dispatch => {
		dispatch({type: 'FILE_UPLOADING'});
		const formData = new FormData();
		files.forEach((file) => {
			formData.append('file', file)
		});
		const token = store.getState().defaults.user.token;
		const requestOptions = {
			headers: { 'Content-Type': 'multipart/form-data', 'token': `${token}` },
			responseType: 'json'
		};
		axios.post(`${API_URL}/upload/image`, formData, requestOptions)
			.then(res => {
				if (res.status === 200) {
					dispatch({type: UPDATE_PHOTO, user: {...res.data, photo: files[0].name}})
				} else {
					console.log(res);
				}
			})
			.catch(err => console.error(err))
	};
};