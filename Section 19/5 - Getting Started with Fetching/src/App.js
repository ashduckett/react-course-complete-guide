import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification';
import { useEffect, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { sendCartData, fetchCartData } from './store/cart-actions';

let isInitial = true;

function App() {
  const showCart = useSelector(state => state.ui.cartIsVisible);
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const notification = useSelector(state => state.ui.notification);

  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);


  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }

    // I assume this works because it will ensure that a call to add/remove actions will finish before the next time this
    // is re-evaluated.
    if (cart.changed) {
      dispatch(sendCartData(cart));
    }
  }, [cart, dispatch]);


  return (
    <Fragment>
      { notification && <Notification status={notification.status} title={notification.title} message={notification.message} /> }
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
