import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import React,{useState} from 'react'
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./components/Home"

export default function App() {

    return(<> 
      <Router>
        <Routes>
          <Route path = "/" element = {<Home/>}/>
        </Routes>
      </Router>
      </>
    )
  }
