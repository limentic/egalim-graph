import './App.css';
import { useAppSelector } from './redux/hooks';

import Titlebar from './components/Titlebar';
import MyTable from './components/Table';
import MyForm from './components/Form';
import Graph from './components/Graph';
import MyModal from './components/Modal';

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
        <MyModal />
      </div>
    </div>
  );
}

export default App;
