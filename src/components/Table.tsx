import './Table.css';
import { useAppSelector } from '../redux/hooks';

function Table() {

    const data = useAppSelector(state => state.food.foodArray);

    const rows = data.map((el) => {
        return (
            <tr key={el.id}>
                <td>{el.date}</td>
                <td>{el.productName}</td>
                <td>{el.weight}</td>
                <td>{el.type}</td>
            </tr>
        )
    })

    return (
        <table id="main-table">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Produit</th>
                    <th>Masse (Kg)</th>
                    <th>Type</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    )   
}

export default Table;