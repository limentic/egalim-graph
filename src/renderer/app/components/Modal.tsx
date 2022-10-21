import './Modal.css';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { setDeleteId, deleteFood, toggleDeleteModal } from '../redux/foodSlice';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const TITLE = 'Suppression d\'entrée';
const MSG = 'Voulez vous vraiment supprimer cette ligne ?';

function MyModal() {
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

    return (
      <Modal show={stateDeleteModal} backdrop='static' keyboard={false} className="custom-modal" centered>
        <Modal.Header closeButton>
          <Modal.Title>{TITLE}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{MSG}</Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleCancel}>
            Annuler
          </Button>
          <Button variant='danger' onClick={handleDelete}>
            Supprimer
          </Button>
        </Modal.Footer>
      </Modal>
    );
}

export default MyModal