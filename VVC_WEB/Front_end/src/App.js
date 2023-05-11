import React from "react";
import { BrowserRouter as Router, Route, Routes,Navigate} from "react-router-dom";
import Login from "./Pages/Login";
import HomePage from './Pages/HomePage';
import Profile from "./Pages/Profile";
import Info from "./Pages/Info";
import SignUp from "./Pages/SignUp";



function App() { 
    return(
            
      <div className="App">
        <Router>

            <Routes>
                <Route exact path="/SignUp" element={<SignUp/>}/>
                <Route exact path="/" element={<Login />}/>
              
                <Route exact path="/profile" element={<Profile/>}/>
                <Route exact path="/home" element={<HomePage/>}/>
                <Route exact path="/info" element={<Info/>}/>

            </Routes>

          </Router>
          
                
           
              
      </div>
  )
}

export default App;
