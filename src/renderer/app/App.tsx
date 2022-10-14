import './App.css';
import { useAppSelector } from './redux/hooks';

import Table from './components/Table';
import Form from './components/Form';
import Graph from './components/Graph';
import Modal from './components/Modal';
import Titlebar from './components/Titlebar';

function App() {
  const foodArray = useAppSelector((state) => state.food.foodArray);

  return (
    <div className='app'>
      <Titlebar />
      <div className='main-container'>
        <div className='card'>
          <div className='card-left'>
            <div className='history'>
              <div className='table'>
                <Table />
              </div>
            </div>
            <div className='panel'>
              <Form />
            </div>
          </div>
          <div className='v-separator' />
          <div className='card-right'>
            {foodArray.length !== 0 ? <Graph /> : <div>Veuillez saisir des données pour afficher le graphique !</div>}
          </div>
        </div>
        <Modal />
      </div>
    </div>
  );
}

export default App;
