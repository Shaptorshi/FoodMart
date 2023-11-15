
import './App.css';

// import Bootstrap from '../node_modules/bootstrap/dist/css'
import {BrowserRouter as Router, Routes,Route} from 'react-router-dom'
import Login from './screens/Login'
import Home from './screens/Home'
import SIGNUP from './screens/SignUp'
import { CartProvider } from './components/ContextReducer';
import MyOrder from './screens/MyOrder';
export default function App() {
    return ( 
        <CartProvider>
        <Router>
        <div>
            <Routes>
                <Route exact path="/" element={<Home/>} />
                <Route exact path="/login" element={<Login/>}/>
                <Route exact path="/createUsers" element={<SIGNUP/>}/>
                <Route exact path="/myorderData" element={<MyOrder/>}/>
            </Routes>
        </div>
        </Router>
        </CartProvider>
    );
}

