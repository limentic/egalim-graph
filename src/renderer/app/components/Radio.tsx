import { useState, ReactNode , useEffect } from 'react';
import './Radio.css';

import Form from 'react-bootstrap/Form';

interface data {
    id: number;
    value: string;
}

function Radio(props: { data: data[], toggleRadio: (id: number) => void, trigger: string }) {
    
    useEffect(() => {
        setId(props.data[0].id);
    }, [props.trigger]);
    
    function radioHandler(i: number): void {
        setId(i);
        props.toggleRadio(i);
    }

    const [id, setId] = useState<number>(props.data[0].id);

    const arrayChoix: ReactNode = props.data.map(el => {
        return <Form.Check inline key={el.id} label={el.value} type="radio" value={el.id} checked={id === el.id} onChange={e => radioHandler(Number(e.target.value))} />
    })

    return (
        <div className="radio mb-3">
            {arrayChoix}
        </div>
    )
}

export default Radio;