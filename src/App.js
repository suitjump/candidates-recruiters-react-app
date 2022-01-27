import './App.css';
import React from 'react';
import Bar from './Components/bar/Bar';
import Form from './Components/base_cand/Form.jsx';
import AdditionCandidates from './Components/base_cand_add/AdditionCandidates.jsx';
import Registration from './Components/registration/Registration';
import style from './Components/bar/bar.module.scss';
import { BrowserRouter as Router, Route, Routes, DefaultRoute } from 'react-router-dom';
import { Fragment } from 'react/cjs/react.production.min';
const App = () => {
  return (
    <Router>
      <Fragment>
        <div className={style.main}>
      <Bar />
        <Routes>
            <Route exact path='/buildfortesters/candidates' element={<Form />} />
            <Route exact path="/buildfortesters/additioncandidates" element={<AdditionCandidates />} />
            <Route exact path="/buildfortesters/registration" element={<Registration />} />
        </Routes>
        </div>
      </Fragment>
    </Router>
  );
};
export default App;
