import { useState } from 'react';
import './Form.css';
import Radio from './Radio';

import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { addFood } from '../redux/foodSlice';

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
      const temp: formData = {...data};
      temp.weight = Number(e.target.value);
      setData(temp);
    }

    function unitHandler(e: React.ChangeEvent<HTMLSelectElement>) {
      const temp: formData = {...data};
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
      }  
    }

    return (
      <form className="form" onSubmit={handleSubmit}>
        <div className="date">
          <div className="label">Date:</div>
          <input className="input" type="date" value={data.date} onChange={dateHandler}/>
        </div>
        <div className="product">
          <input className="name" type="text" placeholder="Nom produit" value={data.productName} onChange={nameHandler}/>
          <input className="weight" type="number" placeholder="Masse" value={data.weight} onChange={weightHandler}/>
          <select className="unit" value={data.unit} onChange={unitHandler}>
            <option value="kg">kg</option>
            <option value="g">g</option>
          </select>
        </div>
        <Radio data={radio} toggleRadio={radioHandler} />
        <button type="submit">Ajouter</button>
      </form>
    )
}

export default Form;