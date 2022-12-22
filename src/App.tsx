import { Suspense, lazy } from 'react';

import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import MainLayout from './layouts/MainLayout';
import './scss/app.scss';
import AddPizza from './pages/AddPizza';
import AboutInfo from './pages/AboutInfo';

const Cart = lazy(() => import(/* webpackChunkName: 'Cart' */ './pages/Cart'));
const FullPizza = lazy(
  () => import(/* webpackChunkName: 'FullPizza' */ './pages/FullPizza'),
);
const NotFound = lazy(
  () => import(/* webpackChunkName: 'NotFound' */ './pages/NotFound'),
);

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route
          path="cart"
          element={
            <Suspense fallback={<div>Идет загрузка корзины...</div>}>
              <Cart />
            </Suspense>
          }
        />
        <Route
          path="pizza/:id"
          element={
            <Suspense>
              <FullPizza />
            </Suspense>
          }
        />
        <Route path="/pizzas/:id/edit" element={<AddPizza />} />
        <Route path="/add-pizza" element={<AddPizza />} />
        <Route path="/about" element={<AboutInfo />} />
        <Route path="admin" element={<Home />} />
        <Route
          path="*"
          element={
            <Suspense>
              <NotFound />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
