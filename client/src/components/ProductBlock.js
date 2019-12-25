import React from 'react';
import PropTypes from 'prop-types';
import Icon from "./Icon";
import {IMG_URL} from "../services/constants";
import classNames from "classnames";
import {Link} from "react-router-dom";

const ProductBlock = ({product, search}) => {
	const {photo, like_count, dis_count, title, subtitle, desc, user, price} = product;
	const classes = classNames(
		'productBlock',
		{'productBlock--hidden': !product.title.toLowerCase().includes(search.toLowerCase())}
	);
	return (
			<Link className={classes} to={`/product/${product._id}`}>
				<div className="productBlock__img">
					{photo
						? <img src={`${IMG_URL}/${photo}`} alt=""/>
						: <Icon name='shopping-cart'/>
					}
				</div>
				<div className="productBlock__desc">
				<span className="productBlock__title">
					{title}
				</span>
				</div>
				<div className="productBlock__counters">
				<span className="productBlock__counter productBlock__like">
					<Icon className='productBlock__icon' name='thumbs-up'/>
					{like_count}
				</span>
					<span className="productBlock__counter productBlock__dis">
					<Icon className='productBlock__icon' name='thumbs-down'/>
						{dis_count}
				</span>
				</div>
			</Link>
	);
};

ProductBlock.propTypes = {
	img: PropTypes.string,
	like_count: PropTypes.number,
	dis_count: PropTypes.number,
};
ProductBlock.defaultProps = {
	img: '',
	like_count: 5,
	dis_count: 0
};
export default ProductBlock;