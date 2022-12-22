import React from 'react';
import axios from '../../axios';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

import styles from './AddPizza.module.scss';

function AddPizza() {
  const [pizzaId, setPizzaId] = React.useState();
  const [pizzaName, setPizzaName] = React.useState();
  const [pizzaImage, setPizzaImage] = React.useState();
  const [pizzaPrice, setPizzaPrice] = React.useState();

  const { id } = useParams();
  const navigate = useNavigate();

  const isEditing = Boolean(id);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    control,
  } = useForm({
    defaultValues: {
      name: pizzaName,
    },
    mode: 'onChange',
  });

  const onSubmit = async (values) => {
    try {
      const types = [values.typeThin ? 0 : '', values.typeThik ? 1 : ''].filter(
        (element) => element !== '',
      );
      const sizes = [
        values.sizeSmall ? 26 : '',
        values.sizeMedium ? 30 : '',
        values.sizeLarge ? 40 : '',
      ].filter((element) => element !== '');
      const item = {
        id: Number(values.id),
        imageUrl: values.imageUrl,
        name: values.name,
        price: Number(values.price),
        category: values.category,
        rating: values.rating,
        types,
        sizes,
      };

      console.log(item);
      const { data } = isEditing
        ? await axios.patch(`/pizzas/${id}`, item)
        : await axios.post('/add', item);
      navigate(`/admin`);
    } catch (error) {
      console.log(error);
      alert('Ошибка при создании пиццы');
    }
  };

  React.useEffect(() => {
    if (id) {
      axios
        .get(`/pizzas/${id}`)
        .then(({ data }) => {
          setPizzaId(data.id);
          setPizzaName(data.name);
          setPizzaPrice(data.price);
          setPizzaImage(data.image);
        })
        .catch((err) => {
          console.log(err);
          alert('Ошибка при получении статьи');
        });
    }
  }, []);

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Добавление пиццы
      </Typography>
      <div className={styles.avatar}></div>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={styles.field}
          label="Название пиццы"
          error={Boolean(errors.name?.message)}
          helperText={errors.name?.message}
          {...register('name', { required: 'Укажите название пиццы' })}
          fullWidth
        />
        <TextField
          className={styles.field}
          label="Ссылка на картинку"
          type="URL"
          error={Boolean(errors.imageUrl?.message)}
          helperText={errors.imageUrl?.message}
          {...register('imageUrl', { required: 'Укажите ссылку на картинку' })}
          fullWidth
        />
        <TextField
          className={styles.field}
          label="Цена"
          error={Boolean(errors.price?.message)}
          helperText={errors.price?.message}
          {...register('price', { required: 'Введите цену' })}
          fullWidth
        />

        <InputLabel id="select-category">Категория</InputLabel>
        <Controller
          render={({ field }) => (
            <Select
              {...field}
              className={styles.field}
              labelId="select-category"
              label="Категория"
              fullWidth
            >
              <MenuItem value={1}>Мясные</MenuItem>
              <MenuItem value={2}>Вегетарианские</MenuItem>
              <MenuItem value={3}>Гриль</MenuItem>
              <MenuItem value={4}>Острые</MenuItem>
              <MenuItem value={5}>Закрытые</MenuItem>
            </Select>
          )}
          control={control}
          name="category"
          defaultValue={1}
        />

        <InputLabel id="select-rating">Рейтинг</InputLabel>
        <Controller
          render={({ field }) => (
            <Select
              {...field}
              className={styles.field}
              labelId="select-rating"
              label="Рейтинг"
              fullWidth
            >
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={6}>6</MenuItem>
              <MenuItem value={7}>7</MenuItem>
              <MenuItem value={8}>8</MenuItem>
              <MenuItem value={9}>9</MenuItem>
              <MenuItem value={10}>10</MenuItem>
            </Select>
          )}
          control={control}
          name="rating"
          defaultValue={1}
        />

        <InputLabel id="select-types">Тесто</InputLabel>
        <FormGroup className={styles.checkbox}>
          <Controller
            render={({ field }) => (
              <FormControlLabel
                {...field}
                control={<Checkbox />}
                label="Тонкое"
              />
            )}
            control={control}
            name="typeThin"
            defaultValue={false}
          />

          <Controller
            render={({ field }) => (
              <FormControlLabel
                {...field}
                control={<Checkbox />}
                label="Традиционное"
              />
            )}
            control={control}
            name="typeThik"
            defaultValue={false}
          />
        </FormGroup>
        <InputLabel id="select-sizes">Размер</InputLabel>
        <FormGroup className={styles.checkbox}>
          <Controller
            render={({ field }) => (
              <FormControlLabel
                {...field}
                control={<Checkbox />}
                label="26 см"
              />
            )}
            control={control}
            name="sizeSmall"
            defaultValue={false}
          />

          <Controller
            render={({ field }) => (
              <FormControlLabel
                {...field}
                control={<Checkbox />}
                label="30 см"
              />
            )}
            control={control}
            name="sizeMedium"
            defaultValue={false}
          />
          <Controller
            render={({ field }) => (
              <FormControlLabel
                {...field}
                control={<Checkbox />}
                label="40 см"
              />
            )}
            control={control}
            name="sizeLarge"
            defaultValue={false}
          />
        </FormGroup>

        <TextField
          className={styles.field}
          label="ID"
          error={Boolean(errors.id?.message)}
          helperText={errors.id?.message}
          {...register('id', { required: 'Введите ID' })}
          fullWidth
        />

        <Button
          disabled={!isValid}
          type="submit"
          size="large"
          variant="contained"
          fullWidth
        >
          Создать
        </Button>
      </form>
    </Paper>
  );
}

export default AddPizza;
