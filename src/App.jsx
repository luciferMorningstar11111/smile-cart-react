import Cart from "components/Cart/Cart";
import Checkout from "components/Checkout";
import PageNotFound from "components/commons/PageNotFound";
import { Route, Switch, Redirect } from "react-router-dom";
import routes from "routes";

import Product from "./components/product";
import ProductList from "./components/productList";

const App = () => (
  <Switch>
    <Redirect exact from={routes.root} to={routes.products.index} />
    <Route exact component={Product} path={routes.products.show} />
    <Route exact component={ProductList} path={routes.products.index} />
    <Route exact component={Cart} path={routes.cart} />
    <Route exact component={Checkout} path={routes.checkout} />
    <Route component={PageNotFound} path="*" />
  </Switch>
);

export default App;
