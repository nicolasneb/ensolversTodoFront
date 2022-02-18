import './App.css';
import FoldersLst from './components/FoldersLst.jsx';
import TodoLst from './components/TodoLst.jsx'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <div className="col-md-3">
      <Router>      
        <Switch>

          <Route exact path="/" component={FoldersLst}/>

          <Route path="/folders/:id" component={TodoLst}/>

        </Switch>
      </Router>
    </div>
  );
}

export default App;
