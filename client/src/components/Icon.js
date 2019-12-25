import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import '@fortawesome/fontawesome-free/css/all.css'

const Icon = ({
				  type, name, className, size, onClick, disabled, ...attrs
			  }) => {
	const classes = classNames(
		type,
		`fa-${name}`,
		className,
	);

	const elemSize = size ? { fontSize: `${size}rem` } : null;

	return (
		<i
			{...attrs}
			className={classes}
			onClick={disabled ? null : onClick}
			style={elemSize}
		/>
	);
};

Icon.propTypes = {
	type: PropTypes.string,
	name: PropTypes.string,
	className: PropTypes.string,
	size: PropTypes.number,
	onClick: PropTypes.func,
};

Icon.defaultProps = {
	type: 'fa',
	name: '',
	className: '',
	size: null,
	onClick: null,
};

export default Icon;