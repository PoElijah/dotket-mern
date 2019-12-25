import React from 'react';
import Icon from "./Icon";
import PropTypes from 'prop-types';

function Modal({title, children, actions, buttonText, onSubmit, onCancel}) {
	const handleAccept = () => {
		onSubmit();
	};
	return (
		<div className='modalBlock'>
			<div className="modalBlock__container">
				<header className="modalBlock__header">
					<span className="modalBlock__title">{title}</span>
					<div className="modalBlock__actions">
						<Icon onClick={onCancel} name='times'/>
					</div>
				</header>
				<div className="modalBlock__content">
					{children}
				</div>
				{actions &&
					<footer className="modalBlock__footer">
						<button onClick={handleAccept} className='modalBlock__btn modalBlock__btn--active'>{buttonText}</button>
					</footer>
				}
			</div>
		</div>
	);
}

Modal.propTypes = {
		title: PropTypes.string,
	children: PropTypes.node,
	actions: PropTypes.bool,
	buttonText: PropTypes.string,
	onSubmit: PropTypes.func,
	onCancel: PropTypes.func,
};
Modal.defaultProps = {
	title: 'Title',
	children: null,
	actions: true,
	buttonText: 'Save',
	onSubmit: () => {},
	onCancel: () => {}
};
export default Modal;