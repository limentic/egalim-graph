import './App.css';
import Table from './components/Table';
import Form, { formData } from './components/Form';
import Graph from './components/Graph'

function App() {
  function addFood(obj: formData) {
    console.log(obj)
  }
  
  return (
    <div className="app">
      <div className="container">
        <div className="left-container">
          <div className="history">
            <div className="table">
              <Table /> 
            </div>
          </div>
          <div className="h-separator"/>
          <div className="panel">
            <Form addFood={addFood}/>
          </div>
        </div>
        <div className="v-separator" />
        <div className="right-container">
          <Graph />
        </div>
      </div>
    </div>
  );
}

export default App;
