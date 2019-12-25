import React, {Component} from 'react';
import default_img from './../assets/images/default-user.png';
import Modal from "../components/Modal";
import Icon from "../components/Icon";
import {IMG_URL} from "../services/constants";

class PageProfile extends Component{
	constructor(props) {
		super(props);
		this.state = {
			uploadBlock: false,
			files: ''
		};
	}
	handleChange = (e) => {
		this.setState({files: Array.from(e.target.files)});
		const reader = new FileReader();
		const file = e.target.files[0];
		reader.onloadend = () => {
			this.setState({
				previewImg: file,
				imagePreviewUrl: reader.result
			});
		};
		reader.readAsDataURL(file)
	};
	openModal = () => {
		this.setState({uploadBlock: !this.state.uploadBlock})
	};
	uploadFiles = () => {
		this.props.uploadFiles(this.state.files);
		this.setState({uploadBlock: false})
	};
	render() {
		const {user} = this.props;
		const {uploadBlock, imagePreviewUrl} = this.state;
		return (
			<div className='mainContent'>
				<div className="profileBlock">
					<div className="profileBlock__container">
						<div className="profileBlock__image" onClick={this.openModal}>
							<img name='file' src={user.photo ? `${IMG_URL}/${user.photo}` : default_img} alt="user_img"/>
						</div>
						<input type="text" value={user.name.first}/>
						<input type="text" value={user.name.last}/>
						<input type="text" value={user.email}/>
					</div>
				</div>
				{uploadBlock &&
					<Modal onSubmit={this.uploadFiles}
						   onCancel={() => this.setState({uploadBlock: false})}
						   title='Добавить фото'
					>
						<div className="uploadField">
							<label className="uploadField__label">
								<input type="file" defaultValue='' className='uploadField__input' onChange={this.handleChange}/>
								{imagePreviewUrl
									? <img src={imagePreviewUrl} alt="preview_img"/>
									: <Icon className='uploadField__icon' name='camera'/>
								}
							</label>
						</div>
					</Modal>
				}
			</div>
		);
	}
}

export default PageProfile;