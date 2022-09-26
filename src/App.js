import React, { Fragment } from 'react';
import './App.css';
import {Routes, Route, Navigate} from 'react-router-dom'
import NavBar from './components/NavBar/NavBar';
import GameList from './components/games/GameList/GameList';
import AddGame from './components/games/AddGame/AddGame';
import ViewGame from './components/games/ViewGame/ViewGame';
import EditGame from './components/games/EditGame/EditGame';


let App = ()=>{
  return (
    <Fragment>
      <NavBar/>
      <Routes>
        <Route path={'/'} element={<Navigate to={'/games/list'}/>}/>
        <Route path={'/games/list'} element={<GameList/>}/>
        <Route path={'/games/add'} element={<AddGame/>}/>
        <Route path={'/games/view/:gameId'} element={<ViewGame/>}/>
        <Route path={'/games/edit/:gameId'} element={<EditGame/>}/>
      </Routes>
    </Fragment>
  );
}

export default App;
