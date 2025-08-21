import { Switch, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Maintenance from "../pages/Maintenance";
import ShopPage from "../pages/ShopPage";
import ProductDetail from "../pages/ProductDetail";
import ContactPage from "../pages/ContactPage";
import AboutPage from "../pages/AboutPage";
import CartPage from "../pages/CartPage";
import CheckoutAddressPage from "../pages/CheckoutAddressPage";
import ProtectedRoute from "./ProtectedRoute";
import AddAddressPage from "../pages/AddAddressPage";


export default function PageContent() {
	return (
		<Switch>
			<Route exact path="/">
				<HomePage />
			</Route>


			<Route path="/shop/:gender/:categoryName/:categoryId/:productNameSlug/:productId">
				<ProductDetail />
			</Route>
			<Route path="/shop">
				<ShopPage />
			</Route>
			<Route path="/cart">
				<CartPage />
			</Route>
			<ProtectedRoute path="/checkout/address/new">
				<AddAddressPage />
			</ProtectedRoute>
			<ProtectedRoute path="/checkout">
				<CheckoutAddressPage />
			</ProtectedRoute>
			<Route path="/contact">
				<ContactPage />
			</Route>
			<Route path="/about">
				<AboutPage />
			</Route>


		</Switch>
	);
}