import React from 'react';
import Icon from "./Icon";
import ClassNames from 'classnames'
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";

const ActionsBlock = ({visible}) => {
	const [active, setActive] = React.useState(false);
	const groupClass = ClassNames(
		'mainActions__group',
		{'mainActions__group--active': active}
	);
	return (
		visible &&
		<div className='mainActions'>
			<div className={groupClass}>
				<Link to='/add' className="mainActions__btn">
					<Icon name='cart-plus'/>
				</Link>
				<div className="mainActions__btn">
					<Icon name='tags'/>
				</div>
			</div>
			<div className="mainActions__btn" onClick={() => setActive(!active)}>
				<Icon name='plus'/>
			</div>
		</div>
	);
};

ActionsBlock.propTypes = {
	visible: PropTypes.bool,
};
ActionsBlock.defaultProps = {
	visible: false
};
export default ActionsBlock;