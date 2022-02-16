import React from "react"
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Home from "./modules/Home"
import CatDetail from "./modules/CatDetail"
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <Router>
        <Routes>
          <Route exact path='/'
              element={<Home />}>
          </Route>
          <Route exact path='/:breedid'
              element={<Home />}>
          </Route>
          {/* Check if user directly went to /cat without an ID */}
          <Route exact path='/cat'
              element={<>Please choose a specific cat first. <Link to={`/`}>Go back</Link></>}>
          </Route>
          <Route exact path='/cat/:catid'
              element={<CatDetail />}>
          </Route>
        </Routes>
    </Router>
  );
}

export default App;
