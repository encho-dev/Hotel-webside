import React from "react";
import{
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import "./App.css"
import Addhotelrooms from "./components/Addhotelrooms";
import Nav from "./components/Nav";
import Hotels from "./components/Hotels";
class App extends React.Component{
  constructor(props){
  super(props);
      
  }

render () {
  return (
      <Router>
          <Nav />
          <div className="App">
          <Routes>
              <Route path="/addhotelrooms" element={<Addhotelrooms/>} />
          </Routes>
          <Routes>
          <Route path="/hotels" element={<Hotels/>} />
          </Routes>
      
           </div>
      </Router>
  );
}
}
export default App;