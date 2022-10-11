import './Modal.css';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { setDeleteId, deleteFood, toggleDeleteModal } from '../redux/foodSlice';

function Modal() {
    const stateDeleteModal = useAppSelector(state => state.food.stateDeleteModal);
    const idDeleteModal = useAppSelector(state => state.food.idDeleteModal);
    const dispatch = useAppDispatch();

     function handleCancel() {
        dispatch(setDeleteId(''))
        dispatch(toggleDeleteModal())

    }

    function handleDelete() {
        dispatch(deleteFood(idDeleteModal))
        dispatch(toggleDeleteModal())
    }

    if (stateDeleteModal === false) {
        return null;
    } else {
        return (
            <div className="modal">
                <div className="modal-content">
                    <div className="text-container">
                        Voulez vous vraiment supprimer cette ligne ?
                    </div>
                    <div className="button-container">
                        <div className="button red" onClick={handleCancel}>Annuler</div>
                        <div className="button green" onClick={handleDelete}>Supprimer</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Modal