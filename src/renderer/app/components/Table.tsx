// import './Table.css';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { toggleDeleteModal, setDeleteId } from '../redux/foodSlice';

import Table from 'react-bootstrap/Table';

function MyTable() {
    const data = useAppSelector(state => state.food.foodArray);
    const categories = useAppSelector(state => state.food.categories);

    const dispatch = useAppDispatch();

    function showDeleteModal(id: string) {
        dispatch(toggleDeleteModal());
        dispatch(setDeleteId(id));
    }

    const rows = data.map((el) => {
        return (
            <tr key={el.id} onClick={() => showDeleteModal(el.id)}>
                <td>{el.date}</td>
                <td>{el.productName}</td>
                <td>{el.weight}</td>
                <td>{categories[el.type].name}</td>
            </tr>
        )
    })

    return (
        <Table responsive className={this.props.className}>
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
        </Table>
    )   
}

export default MyTable;