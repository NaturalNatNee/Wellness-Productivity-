import Timer from "./components/timer/Timer.jsx"
import { useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import './App.css'


/* import TrackingPage from './components/TrackingPage' */
import TrackingTable from './components/TrackingTable/TrackingTable'
import TrackingGraph from './components/TrackingGraphs/TrackingGraph'

function App() {
 

  return (
    <>
      <Timer/>
    <TrackingGraph />
    <TrackingTable />
    </> 

export default App
