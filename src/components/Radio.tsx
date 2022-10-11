import { useState, ReactNode } from 'react';
import './Radio.css';

interface data {
    id: number;
    value: string;
}

function Radio(props: { data: data[], toggleRadio: (id: number) => void }) {
    function radioHandler(i: number): void {
        setId(i);
        props.toggleRadio(i);
    }

    const [id, setId] = useState<number>(props.data[0].id);

    const arrayChoix: ReactNode = props.data.map(el => {
        return <div key={el.id}><input type="radio" value={el.id} checked={id === el.id} onChange={e => radioHandler(Number(e.target.value))} />{el.value}</div>
    })

    return (
        <div className="radio">
            {arrayChoix}
        </div>
    )
}

export default Radio;