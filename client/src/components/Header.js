import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import ClassNames from "classnames";
import {IMG_URL} from "../services/constants";
import default_img from './../assets/images/default-user.png';
import Icon from "./Icon";


class Header extends Component {
	constructor(props) {
		super(props);
		this.userIcon = React.createRef();
		this.userBlock = React.createRef();
		this.state = {
			login: '',
			password: '',
			userBlock: false,
			filled: false
		}
	}
	componentDidMount() {
		document.addEventListener('click', this.handleClick, false)
	};
	handleClick = (e) => {
		if (!this.userIcon.current.contains(e.target) && this.userBlock.current && !this.userBlock.current.contains(e.target)) {
			this.setState({userBlock: false})
		}
	};
	handleChange = (e) => {
		this.setState({[e.target.name]: e.target.value})
	};
	handleLogin = () => {
		if (this.state.login && this.state.password) {
			this.props.logIn(this.state.login,this.state.password)
		}
	};
	showUser = () => {
		this.setState({userBlock: !this.state.userBlock})
	};
	render() {
		const {login, password, userBlock} = this.state;
		const {logged, user, logOut, message, pathname, searchProduct, search} = this.props;
		const btnClass = ClassNames(
			'userBlock__btn',
			{'userBlock__btn--active': this.state.login && this.state.password}
		);
		const userBlockClass = ClassNames(
			'userBlock',
			{'userBlock--active': userBlock}
		);
		return (
			<div className='mainHeader'>
				<div className='mainLogo'>
					.Ket
				</div>
				<div className="mainSearch">
					<input type="text" value={search} onChange={(e) => searchProduct(e.target.value)} className="mainSearch__input"/>
					<Icon name='search'/>
				</div>
				<nav className='mainNav'>
					<ul className='mainNav__ul'>
						<li><Link className={`mainNav__link ${pathname === '/' && 'mainNav__link--active'}`} to='/'>Home</Link></li>
						<li><Link className={`mainNav__link ${pathname === '/market' && 'mainNav__link--active'}`} to='/market'>Market</Link></li>
						<li><Link className={`mainNav__link ${pathname === '/smth' && 'mainNav__link--active'}`} to='/smth'>Smth</Link></li>
					</ul>
					<div className='mainNav__user' onClick={this.showUser} ref={this.userIcon}>
						<img src={user.photo ? `${IMG_URL}/${user.photo}` : default_img} alt="user_img"/>
					</div>
				</nav>
				<div className={userBlockClass} ref={this.userBlock}>
					{!logged ?
						<>
							{message && <span>{message}</span>}
							<input onChange={this.handleChange} name='login' value={login} className='userBlock__input' type='text' placeholder='Email'/>
							<input onChange={this.handleChange} name='password' value={password} className='userBlock__input' type='password' placeholder='Пароль'/>
							<button onClick={this.handleLogin} className={btnClass}>Войти</button>
							<Link className='userBlock__link' to='registration'>Регистрация</Link>
						</> :
						<>
							<div className="userBlock__img">
								<img src={user.photo ? `${IMG_URL}/${user.photo}` : default_img} alt="user_img"/>
							</div>
							<Link to='/profile'>{`${user.name.first} ${user.name.last}`}</Link>
							<button onClick={logOut} className='userBlock__btn userBlock__btn--active'>Выйти</button>
						</>
					}
				</div>
			</div>
		);
	}
}



export default Header;