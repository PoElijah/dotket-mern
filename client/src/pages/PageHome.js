import React, {Component} from 'react';
import {connect} from "react-redux";
import ProductBlock from "../components/ProductBlock";
import {getProducts} from "../store/actions/productsActions";

class PageHome extends Component {
	componentDidMount() {
		this.props.getProducts()
	}
	render() {
		return (
			<div className='mainContent'>
				<div className="productsGroup">
					{this.props.products.map(product => {
						return (
							<ProductBlock key={product._id} search={this.props.search} product={product}/>
						)
					})}
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		message: state.defaults.message,
		logged: state.defaults.logged,
		products: state.products.products,
		search: state.products.search,

	}
};
const mapDispatchToProps = (dispatch) => {
	return {
		getProducts: () => dispatch(getProducts())
	}
};
export default connect(mapStateToProps, mapDispatchToProps)(PageHome);