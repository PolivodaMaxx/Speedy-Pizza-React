import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectCartItemById } from '../../redux/cart/selectors';
import { addItem } from '../../redux/cart/slice';
import { CartItemType } from '../../redux/cart/types';

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import { fetchRemovePizza } from '../../redux/pizza/asyncActions';
import { useAppDispatch } from '../../redux/store';

const typeNames = ['тонкое', 'традиционное'];

type PizzaBlockProps = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
  isEditable: boolean;
};

const PizzaBlock: React.FC<PizzaBlockProps> = ({
  id,
  name,
  price,
  imageUrl,
  sizes,
  types,
  isEditable,
}) => {
  const dispatch = useAppDispatch();

  const cartItem = useSelector(selectCartItemById(id));
  const [activeType, setActiveType] = React.useState(0);
  const [activeSize, setActiveSize] = React.useState(0);
  const addedCount = cartItem ? cartItem.count : 0;

  const onClickAdd = () => {
    const item: CartItemType = {
      id,
      name,
      price,
      imageUrl,
      type: typeNames[activeType],
      size: sizes[activeSize],
      count: 0,
    };
    dispatch(addItem(item));
  };

  const onClickRemove = () => {
    if (window.confirm('Вы действительно хотите удалить данный товар?')) {
      dispatch(fetchRemovePizza(id));
    }
  };

  return (
    <div className="pizza-block-wrapper">
      <div className="pizza-block">
        {isEditable && (
          <div className="pizza-block__edit-buttons">
            <Link to={`/pizzas/${id}/edit`}>
              <IconButton color="primary">
                <EditIcon />
              </IconButton>
            </Link>
            <IconButton onClick={onClickRemove} color="secondary">
              <DeleteIcon />
            </IconButton>
          </div>
        )}
        <Link key={id} to={`/pizza/${id}`}>
          <img className="pizza-block__image" src={imageUrl} alt={name} />
          <h4 className="pizza-block__title">{name}</h4>
        </Link>
        <div className="pizza-block__selector">
          <ul>
            {types.map((type) => (
              <li
                key={type}
                onClick={() => setActiveType(type)}
                className={activeType === type ? 'active' : ''}
              >
                {typeNames[type]}
              </li>
            ))}
          </ul>
          <ul>
            {sizes.map((size, index) => (
              <li
                key={index}
                onClick={() => setActiveSize(index)}
                className={activeSize === index ? 'active' : ''}
              >
                {size} см.
              </li>
            ))}
          </ul>
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">от {price} ₽</div>
          <button
            onClick={onClickAdd}
            className="button button--outline button--add"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span>Добавить</span>
            {addedCount > 0 && <i>{addedCount}</i>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PizzaBlock;
