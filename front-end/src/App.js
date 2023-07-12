import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home/Home';
import { useEffect } from 'react';
import { getAuth } from './RequMethods';
import Profile from './components/Profile/Profile';
import SearchPage from './components/Searsh/SearchPage';
import AddPost from './components/Addvideo/AddPost';

export const tags = ["sport" , 'football' , 'music' , 'fashion' , 'model' , 'men' , 'makeup' , 'wear' , 'clothes' , 'art' , 'beauty' , 'food' , 'cook' , "science" , "funny" , "love" , 'sad' , "nature" , "coding" , "anime" , 'movies' , "learn"]


function App() {
  

  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />}   />
        <Route path='/*'   element={ <Home /> } />
    
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
