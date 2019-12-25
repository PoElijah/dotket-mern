import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Icon from "../components/Icon";
import {Link} from "react-router-dom";

class PageAdd extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: "",
			subtitle: "",
			type: "1",
			desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus animi architecto at, blanditiis dolor dolorem ea facere hic iste magni minima neque nesciunt non, perferendis quam ratione reprehenderit repudiandae voluptatem. Ab adipisci aliquid, ducimus necessitatibus reiciendis repudiandae sapiente similique sunt velit. A animi aut eos libero non quam totam voluptatem!",
			price: "",
			photo: "img_2.jpeg"
		}
	}
	addProduct = () => {
		const {title, subtitle, type, desc, price, photo} = this.state;
		const product = {
			title: title,
			subtitle: subtitle,
			type: type,
			desc: desc,
			price: price,
			photo: photo
		};
		this.props.addProduct(product);
	};
	handleChange = (e) => {
		this.setState({[e.target.name]: e.target.value})
	};
	render() {
		const {title, subtitle, type, desc, price, photo} = this.state;
		return (
			<div className='mainContent'>
				<div className="addGroup">
					<div className="productInfo">
						<div className="productInfo__info">
							<label className="customInput__label">
								Title
								<input type="text" name="title" onChange={this.handleChange} value={title} className="customInput__input"/>
							</label>
							<label className="customInput__label">
								Subtitle
								<input type="text" name="subtitle" onChange={this.handleChange} value={subtitle} className="customInput__input"/>
							</label>
							<label className="customInput__label">
								Type
								<select name="type" onChange={this.handleChange} value={type} id="product_type" className="customInput__input">
									<option value="1">Book</option>
									<option value="2">Art</option>
									<option value="3">Smth</option>
								</select>
							</label>
							<label className="customInput__label">
								Описание
								<textarea className="customInput__input"
										  value={desc}
										  onChange={this.handleChange}
										  name="desc"
										  id="product_desc"
										  cols="30"
										  rows="10">
								</textarea>
							</label>
							<label className="customInput__label">
								Цена
								<input type="number" name="price" onChange={this.handleChange} value={price} className="customInput__input" placeholder="$"/>
							</label>
						</div>
						<div className="productInfo__photo">
							<label className="customInput__photo">
								<Icon name='camera'/>
								<input name="photo" onChange={this.handleChange} value={photo} type="text"/>
							</label>
						</div>
					</div>
					<div className="buttonGroup">
						<Link to='/'><button className="buttonGroup__btn buttonGroup__btn--cancel">Отмена</button></Link>
						<button onClick={this.addProduct} className="buttonGroup__btn">Добавить</button>
					</div>
				</div>
			</div>
		);
	}
}

PageAdd.propTypes = {
	addProduct: PropTypes.func,
};

export default PageAdd;

