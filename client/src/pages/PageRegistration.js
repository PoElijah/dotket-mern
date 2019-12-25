import React, {Component} from 'react';
import {connect} from "react-redux";
import {register} from './../store/actions/authActions'
import {withRouter} from "react-router-dom";
import PropTypes from 'prop-types';
import ClassNames from 'classnames';

class PageRegistration extends Component {
	constructor(props) {
		super(props);
		this.state = {
			firsName: 'admin',
			lastName: 'admin',
			nickName: 'admin',
			email: 'admin@as.com',
			password: 'password',
			confirm_password: 'password',
			errors: '',
			filled: false
		};
		this.ref = React.createRef();
	}
	handleChange = (e) => {
		this.setState({[e.target.name]: e.target.value})
	};
	handleConfirm = (e) => {
		const user = {
			name: {
				first: this.state.firsName,
				last: this.state.lastName,
				nickname: this.state.nickName,
			},
			email: this.state.email,
			password: this.state.password
		};
		if (this.state.password === this.state.confirm_password) {
			this.setState({errors: ''});
			this.props.registerUser(user);
		} else {
			this.setState({errors: 'Пароли не совпадают'})
		}
	};
	render() {
		const fields = [
			{title: 'Имя', name: 'firsName'},
			{title: 'Фамилия', name: 'lastName'},
			{title: 'Ник', name: 'nickName'},
			{title: 'Почта', name: 'email'},
			{title: 'Пароль', name: 'password'},
			{title: 'Подтвреждение пароля', name: 'confirm_password'},
		];
		const {firsName, lastName, nickName, email, password, confirm_password} = this.state;
		const btnClass = ClassNames(
			'mainReg__btn',
			{'mainReg__btn--active': firsName && lastName && nickName && email && password && confirm_password}
		);
		return (
			<div className='mainContent'>
				<div className="mainReg">
					<div className="mainReg__container">
						{this.state.errors && <span className='errorText'>{this.state.errors}</span>}
						{this.props.message && <span className='errorText'>{this.props.message}</span>}
						{fields.map(field => {
							return (
								<label key={field.name} className='mainReg__title'>
									{field.title}
									<input
										onChange={this.handleChange}
										name={field.name}
										value={this.state[field.name]}
										type="text"
										className="mainReg__input"
									/>
								</label>
							)
						})}
						<button onClick={this.handleConfirm} ref={this.ref} className={btnClass}>Зарегистрироваться</button>
					</div>
				</div>
			</div>
		);
	}
}

PageRegistration.propTypes = {
	message: PropTypes.string,
};
const mapStateToProps = (state) => {
	return {
		message: state.defaults.message
	}
};
const mapDispatchToProps = (dispatch) => {
	return {
		registerUser: (user) => dispatch(register(user)),
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PageRegistration));