import './App.css';
import { useAppSelector } from './redux/hooks';

import MyTable from './components/Table';
import MyForm from './components/Form';
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
            <MyTable />
            <MyForm />
          </div>
          <div className='v-separator' />
          <div className='card-right'>{foodArray.length !== 0 ? <Graph /> : <div>Veuillez saisir des données pour afficher le graphique !</div>}</div>
        </div>
        <Modal />
      </div>
    </div>
  );
}

export default App;
