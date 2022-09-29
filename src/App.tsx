import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { useDispatch  } from 'react-redux';

import './App.css';

import Users from './pages/Users';
import User from './pages/User';
import About from './pages/About';
import Forbidden from './pages/Forbidden';
import {AppDispatch} from './store/store';
import { switchRight } from './store/rightsSlice';
import PrivateRoutes from './routes/Private-routes';

function App() {
  const dispatch = useDispatch<AppDispatch>();
    // trables with interfaces !!!
    const rightHandle = ({ target: { value }}: React.ChangeEvent<HTMLInputElement>): void => {

        dispatch(switchRight(value))
  }

  return (
    <div className="App h-full flex flex-col">
      <header className="App-header h-22">
          <nav>
              <Link to="/">USERS</Link> |{' '}
              <Link to="about">ABOUT</Link>
          </nav>
          <div className="flex text-base">
              <div className="mr-5">
                  <input onChange={rightHandle} type="checkbox" value="100" name="usersAccess" defaultChecked={true} />
                  <label htmlFor="usersAccess">users page</label>
              </div>
              <div className="mr-5">
                  <input onChange={rightHandle} type="checkbox" value="101" name="userAccess" defaultChecked={true}/>
                  <label htmlFor="userAccess">user page</label>
              </div>
              <div>
                  <input onChange={rightHandle} type="checkbox" value="102" name="aboutAccess" defaultChecked={true}/>
                  <label htmlFor="aboutAccess">about page</label>
              </div>
          </div>
      </header>
        <Routes>
            <Route element={<PrivateRoutes/>}>
                <Route path="/" element={<Users />} />
                <Route path="user/:id" element={<User />} />
                <Route path="/about" element={<About />} />
            </Route>
            <Route path="/forbidden" element={<Forbidden />} />
        </Routes>
    </div>
  );
}

export default App;
