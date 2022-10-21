import { useState } from 'react';
import Radio from './Radio';

import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { addFood } from '../redux/foodSlice';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

import { nanoid } from 'nanoid';

export interface formData {
  id: string, 
  date: string,
  productName: string,
  weight: number,
  unit: 'kg' | 'g',
  type: number,
}

function MyForm(props: { className?: string }) {
  const categories = useAppSelector((state) => state.food.categories);
  const radio = categories.map((el) => {
    return {
      id: el.id,
      value: el.name,
    };
  });

  const dispatch = useAppDispatch();

  const dataInit: formData = {
    id: nanoid(),
    date: new Date().toISOString().slice(0, 10),
    productName: '',
    weight: 0,
    unit: 'kg',
    type: 0,
  };

  const [data, setData] = useState<formData>(dataInit);
  const [weight, setWeight] = useState<string>('');
  const [trigger, setTrigger] = useState<string>('');

  function checkIfNumerical(num: string): boolean {
    const regex = new RegExp('^(?=.)([+]?([0-9]*)(\\.([0-9]+))?)$');
    return regex.test(num) ? true : false;
  }

  function dateHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const temp: formData = { ...data };
    temp.date = e.target.value;
    setData(temp);
  }

  function nameHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const temp: formData = { ...data };
    temp.productName = e.target.value;
    setData(temp);
  }

  function weightHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setWeight(e.target.value);
    if (checkIfNumerical(e.target.value)) {
      setData({
        ...data,
        weight: parseFloat(e.target.value),
      });
    }
  }

  function unitHandler(e: React.ChangeEvent<HTMLSelectElement>) {
    const temp: formData = { ...data };
    temp.unit = e.target.value as 'kg' | 'g';
    setData(temp);
  }

  function radioHandler(id: number) {
    const temp: formData = { ...data };
    temp.type = Number(id);
    setData(temp);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (data.date !== '' && data.productName !== '' && data.weight > 0) {
      dispatch(addFood(data));
      setData(dataInit);
      setWeight('');
      setTrigger(data.id)
    }
  }

  return (
    <Form className={props.className} onSubmit={handleSubmit}>
      <Form.Group className='mb-3'>
        <Form.Label>Date</Form.Label>
        <Form.Control placeholder='JJ/MM/AAAA' type='date' value={data.date} onChange={dateHandler} />
      </Form.Group>

      <Row className='mb-3'>
        <Form.Group as={Col} sm={6}>
          <Form.Label>Nom produit</Form.Label>
          <Form.Control value={data.productName} onChange={nameHandler} />
        </Form.Group>

        <Form.Group as={Col} sm={3}>
          <Form.Label>Masse</Form.Label>
          <Form.Control value={weight} onChange={weightHandler} />
        </Form.Group>

        <Form.Group as={Col} sm={3}>
          <Form.Label>Unité</Form.Label>
          <Form.Select value={data.unit} onChange={unitHandler}>
            <option value='kg'>kg</option>
            <option value='g'>g</option>
          </Form.Select>
        </Form.Group>
      </Row>

      <Form.Group className='mb-3'>
        <Form.Label>Catégorie</Form.Label>
        <Radio data={radio} toggleRadio={radioHandler} trigger={trigger}/>
      </Form.Group>

      <ButtonGroup className='d-flex'>
        <Button className='float-end' variant='primary' type='submit'>
          Ajouter
        </Button>
      </ButtonGroup>
    </Form>
  );
}

export default MyForm;