import { useState, useEffect } from 'react';
import './Form.css';
import Radio from './Radio';

import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { addFood } from '../redux/foodSlice';

import { TextField } from '@fluentui/react/lib/TextField';
import { nanoid } from 'nanoid';

export interface formData {
  id: string, 
  date: string,
  productName: string,
  weight: number,
  unit: 'kg' | 'g',
  type: number,
}

function Form() {
    const categories = useAppSelector(state => state.food.categories);
    const radio = categories.map((el) => {
        return {
            id: el.id,
            value: el.name
        }
    })

    const dispatch = useAppDispatch();

    const dataInit: formData = {
      id: nanoid(),
      date: new Date().toISOString().slice(0, 10),
      productName: '',
      weight: 0,
      unit: 'kg',
      type: 0
    }

    const [data, setData] = useState<formData>(dataInit)
    const [weightStr, setWeightStr] = useState<string>('')

    useEffect(() => {
      const weightRegex = new RegExp('^(?=.)([+]?([0-9]*)(\\.([0-9]+))?)$');

      if (weightRegex.test(weightStr) === true) {
        errorWeight = '';
        setData({
          ...data,
          weight: parseFloat(weightStr)
        })
      } else {
        errorWeight = 'Veuillez saisir un nombre'
      }
    }, [weightStr]);

    let errorWeight = ''

    function dateHandler(e: React.ChangeEvent<HTMLInputElement>) {
      const temp: formData = {...data};
      temp.date = e.target.value;
      setData(temp);
    }

    function nameHandler(e: React.ChangeEvent<HTMLInputElement>) {
      const temp: formData = {...data};
      temp.productName = e.target.value;
      setData(temp);
    }

    function weightHandler(e: React.ChangeEvent<HTMLInputElement>) {
      setWeightStr(e.target.value);
    }

    function unitHandler(e: React.ChangeEvent<HTMLSelectElement>) {
      const temp: formData = { ...data };
      temp.unit = e.target.value as 'kg' | 'g';
      setData(temp);
    }

    function radioHandler(id: number) {
      const temp: formData = {...data};
      temp.type = Number(id);
      setData(temp);
    }

    function handleSubmit (e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault()
      if (
        data.date === '' ||
        data.productName === '' ||
        data.weight === 0
      ) { alert('Des champs ne sont pas saisis !'); } else {
        dispatch(addFood(data));
        setData(dataInit);
        setWeightStr(null);
      }  
    }

    return (
      <form className='form' onSubmit={handleSubmit}>
        <div className='date'>
          <div className='label'>Date:</div>
          <input className='input' type='date' value={data.date} onChange={dateHandler} />
        </div>
        <div className='product'>
          <TextField placeholder='Nom produit' value={data.productName} onChange={nameHandler} />
          <TextField placeholder='Masse' value={weightStr} onChange={weightHandler} errorMessage={errorWeight}/>
          <select className='unit' value={data.unit} onChange={unitHandler}>
            <option value='kg'>kg</option>
            <option value='g'>g</option>
          </select>
        </div>
        <Radio data={radio} toggleRadio={radioHandler} />
        <button type='submit'>Ajouter</button>
      </form>
    );
}

export default Form;