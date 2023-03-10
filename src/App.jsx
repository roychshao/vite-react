import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home.jsx'
import Register from './pages/Register/Register.jsx'
import Login from './pages/Login/Login.jsx'

function App() {
 
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/login" element={<Login/>}/>
            </Routes>
        </div>
    )
}

export default App
