import React from 'react';
import './stylesheets/index.css';
import Convert from './components/converter';
// import Categories from './components/categories';
import Category from './components/category';
import Navbar from './components/Navbar';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import MarketCap from './components/MarketCap';
import Category_converter from './components/Category_converter';




function App() {
 
  return (
    <Router>
    <div className="App">

      <div>
        <Navbar />
      </div>

      <div className="max-w-xl  m-auto pb-6 pt-14">
      <Route exact path="/" component={Convert} />
      <Route exact path="/categories/:id" component={Category_converter} />
        
      </div>

      <div>
       <Route exact path="/" component={MarketCap} />
      </div>

      <div>
        {/* <Route exact path="/" component={Categories} /> */}
        <Route exact path="/categories/:id" component={Category} />
      </div>
      
    </div>
    </Router>
  )
}

export default App
