import React, {Component} from 'react';
import {IMG_URL} from "../services/constants";
import Icon from "../components/Icon";

class PageProduct extends Component {
	componentDidMount() {
		this.props.getSpecificProduct(this.props.match.match.params.id);
	}
	deleteProduct = () => {
		this.props.deleteProduct(this.props.product);
	};
	render() {
		const {product, user} = this.props;
		return (
			<div className='mainContent'>
				{product.user &&
				<div className="singleProduct">
					<div className="singleProduct__left">
						<img className='singleProduct__img' src={`${IMG_URL}/${product.user.photo}`} alt="product_img"/>
						<ul className="singleProduct__user">
							{product.user.name.first && <li>{product.user.name.first}</li>}
							{product.user.name.last && <li>{product.user.name.last}</li>}
							{product.user.name.nickname && <li>{product.user.name.nickname}</li>}
							<li>{product.user.email}</li>
						</ul>
						{product.user.id === user.id &&
						<div className="singleProduct__actions">
							<span onClick={this.deleteProduct}><Icon name='times'/></span>
						</div>
						}
					</div>
					<div className="singleProduct__right">
						<div className="singleProduct__product">
							<h2>{product.title}</h2>
							<img className='singleProduct__img' src={`${IMG_URL}/${product.photo}`} alt="product_img"/>
						</div>
						<hr/>
						<p className='singleProduct__desc'>{product.desc}</p>
					</div>
				</div>
				}
			</div>
		);
	}
}

export default PageProduct;