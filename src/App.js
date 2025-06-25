import './App.css';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Users from './components/Users/Users';
import Items from './components/Items/Items';
import Bids from './components/Bids/Bids';
import Home from './components/Home/Home';
function App() {
  return (
      <Router>
        <div>
          <nav>
            <Link to='/'>Home</Link>
            <Link to='/users'>Users</Link>
            <Link to='/items'>Items</Link>
            <Link to='/bids'>Bids</Link>
          </nav>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/users' element={<Users/>}/>
            <Route path='/items' element={<Items/>}/>
            <Route path='/bids' element={<Bids/>}/>
          </Routes>
        </div>
      </Router>
  );
}

export default App;
