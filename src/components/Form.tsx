import { useState } from 'react';
import './Form.css';
import Radio from './Radio';

const RADIO = [
  {
    "id": 0,
    "value": "Bio"
  },
  {
    "id": 1,
    "value": "Durable (hors bio)"
  },
  {
    "id": 2,
    "value": "Autre"
  }
]

export interface formData {
  date: string,
  productName: string,
  weight: number,
  unit: 'kg' | 'g',
  type: number,
}

function Form(props: { addFood: (obj: formData) => void }) {
    const dataInit: formData = {
      date: new Date().toISOString().slice(0, 10),
      productName: '',
      weight: 0,
      unit: 'kg',
      type: 0
    }

    const [data, setData] = useState<formData>(dataInit)

    function dateHandler(e: React.ChangeEvent<HTMLInputElement>) {
      let temp: formData = {...data};
      temp.date = e.target.value;
      setData(temp);
    }

    function nameHandler(e: React.ChangeEvent<HTMLInputElement>) {
      let temp: formData = {...data};
      temp.productName = e.target.value;
      setData(temp);
    }

    function weightHandler(e: React.ChangeEvent<HTMLInputElement>) {
      let temp: formData = {...data};
      temp.weight = Number(e.target.value);
      setData(temp);
    }

    function unitHandler(e: React.ChangeEvent<HTMLSelectElement>) {
      let temp: formData = {...data};
      temp.unit = e.target.value as 'kg' | 'g';
      setData(temp);
    }

    function radioHandler(id: number) {
      let temp: formData = {...data};
      temp.type = Number(id);
      setData(temp);
    }

    function handleSubmit (e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault()
      if (
        data.date === '' ||
        data.productName === '' ||
        data.weight === 0
      ) { alert('Des champs ne sont pas saisis !') } else {
        props.addFood(data)
        setData(dataInit)
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
        <Radio data={RADIO} toggleRadio={radioHandler} />
        <button type="submit">Ajouter</button>
      </form>
    )
}

export default Form;