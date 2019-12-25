import React, {Component} from 'react';
import './sass/index.scss'
import {Switch, Route} from 'react-router-dom'
import Header from "./components/Header";
import PageHome from "./pages/PageHome";
import PageRegistration from "./pages/PageRegistration";
import {connect} from "react-redux";
import {logIn, logOut, sessionCheck} from "./store/actions/authActions";
import PageProfile from "./pages/PageProfile";
import {uploadFiles} from "./store/actions/filesActions";
import PageAdd from "./pages/PageAdd";
import ActionsBlock from "./components/ActionsBlock";
import {addProduct, deleteProduct, getSpecificProduct, searchProduct} from "./store/actions/productsActions";
import PageProduct from "./pages/PageProduct";

class App extends Component{
	componentDidMount() {
		this.props.sessionCheck();
	}

	render() {
		return (
			<>
				<div className="App">
					<Header message={this.props.message}
							logged={this.props.logged}
							user={this.props.user}
							logIn={this.props.logIn}
							search={this.props.search}
							logOut={this.props.logOut}
							searchProduct={this.props.searchProduct}
							pathname={this.props.pathname}
					/>
					<ActionsBlock visible={this.props.logged}/>
					<Switch>
						<Route exact path='/'>
							<PageHome/>
						</Route>
						<Route exact path='/market'>
							<h1>Market</h1>
						</Route>
						<Route exact path='/registration'>
							{!this.props.logged
								? <PageRegistration/>
								: <h1>Not Found</h1>
							}
						</Route>
						<Route path='/profile'>
							{this.props.logged
								? <PageProfile user={this.props.user}
											   uploadFiles={this.props.uploadFiles}
								/>
								: <h1>Not Found</h1>
							}
						</Route>
						<Route path='/add'>
							{this.props.logged
								? <PageAdd addProduct={this.props.addProduct}/>
								: <h1>Not Found</h1>
							}

						</Route>
						<Route path='/product/:id' render={(match) =>
							<PageProduct user={this.props.user}
										 match={match}
										 deleteProduct={this.props.deleteProduct}
										 product={this.props.single_product}
										 getSpecificProduct={this.props.getSpecificProduct}
							/>}
						/>

					</Switch>
				</div>
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		message: state.defaults.message,
		logged: state.defaults.logged,
		user: state.defaults.user,
		pathname: state.router.location.pathname,
		search: state.products.search,
		single_product: state.products.single,
	}
};
const mapDispatchToProps = (dispatch) => {
	return {
		sessionCheck: () => dispatch(sessionCheck()),
		uploadFiles: (files) => dispatch(uploadFiles(files)),
		logIn: (login, password) => dispatch(logIn(login, password)),
		logOut: () => dispatch(logOut()),
		addProduct: (product) => dispatch(addProduct(product)),
		searchProduct: (query) => dispatch(searchProduct(query)),
		getSpecificProduct: (id) => dispatch(getSpecificProduct(id)),
		deleteProduct: (product) => dispatch(deleteProduct(product))
	}
};
export default connect(mapStateToProps, mapDispatchToProps)(App);

