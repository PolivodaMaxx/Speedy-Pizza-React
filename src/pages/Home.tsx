import React from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import qs from 'qs';
import { useSelector } from 'react-redux';

import {
  setCategoryId,
  setCurrentPage,
  setFilters,
} from '../redux/filter/slice';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { sortList } from '../components/Sort';
import { selectPizzaData } from '../redux/pizza/selectors';
import { useAppDispatch } from '../redux/store';
import { selectFilter } from '../redux/filter/selectors';
import { fetchPizzas } from '../redux/pizza/asyncActions';
import { Pizza, SearchPizzaParams } from '../redux/pizza/types';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);
  const location = useLocation();
  const isEditable = Boolean(location.pathname == '/admin');

  const { categoryId, sort, currentPage, searchValue } =
    useSelector(selectFilter);
  const { items, status } = useSelector(selectPizzaData);

  const onChangeCategory = React.useCallback((idx: number) => {
    dispatch(setCategoryId(idx));
  }, []);

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const getPizzas = async () => {
    const sortBy = sort.sortProperty.replace('-', '');
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const category = `${categoryId}`;

    dispatch(
      fetchPizzas({
        sortBy,
        order,
        category,
        currentPage: String(currentPage),
      }),
    );

    window.scrollTo(0, 0);
  };

  // //Если изменили параметры и был первый рендер
  // React.useEffect(() => {
  //   if (isMounted.current) {
  //     const queryString = qs.stringify({
  //       sortProperty: sort.sortProperty,
  //       categoryId,
  //       currentPage,
  //     });
  //     navigate(`?${queryString}`);
  //   }
  //   isMounted.current = true;
  // }, [categoryId, sort.sortProperty, currentPage]);

  //Если был первый рендер, то проверяем URL-параметры и сохраняем в редаксе
  // React.useEffect(() => {
  //   if (window.location.search) {
  //     const params =qs.parse(window.location.search.substring(1)) ;
  //     const sort = sortList.find(
  //       (obj) => obj.sortProperty === params.sortBy
  //     );

  //     dispatch(
  //       setFilters({
  //         categoryId: Number(params.category),
  //         currentPage: Number(params.currentPage),
  //         sort: sort ? sort: sortList[0],
  //       })
  //     );
  //     isSearch.current = true;
  //   }
  // }, []);

  //Если был первый рендер, то запрашиваем пиццы
  React.useEffect(() => {
    getPizzas();
  }, [categoryId, sort.sortProperty, currentPage]);

  const pizzas = items
    .filter((obj: Pizza) => {
      if (
        obj.name
          .toLowerCase()
          .includes(searchValue ? searchValue.toLowerCase() : '')
      ) {
        return true;
      }
      return false;
    })
    .map((obj: Pizza) => (
      <PizzaBlock key={obj.id} {...obj} isEditable={isEditable} />
    ));
  const skeletons = [...new Array(8)].map((i, index) => (
    <Skeleton key={index} />
  ));

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort value={sort} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === 'error' ? (
        <div className="content__error-info">
          <h2>Произошла ошибка :(</h2>
          <p>
            К сожалению, не удалось загрузить пиццы. Повторите попытку позже!
          </p>
          <Link to="/about">О нас</Link>
        </div>
      ) : (
        <>
          <div className="content__items">
            {status === 'loading' ? skeletons : pizzas}
          </div>
          {/* <Pagination currentPage={currentPage} onChangePage={onChangePage} /> */}
        </>
      )}
    </div>
  );
};

export default Home;
