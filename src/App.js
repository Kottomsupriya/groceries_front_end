import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './Components/Login/login'
import Homepage from './Components/Homepage/homepage'
import UserSignup from './Components/Signup/user_signup'
import VendorSignup from './Components/Signup/vendor_signup'
import UserHome from './Components/User_Vendor_Home/user_home'
import VendorHome from './Components/User_Vendor_Home/vendor_home'
import UploadProduct from './Components/UploadProduct/UploadProduct'
import Footer from './Components/Footer/footer'
import Header from './Components/Header/header'
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
        <Router>
          <Switch>
            <Route path="/" exact render={props=><Homepage {...props}/>}/>
            <Route path="/login" exact render={props=><Login {...props}/>}/>
            <Route path="/user-signup" exact render={props=><UserSignup {...props}/>}/>
            <Route path="/vendor-signup" exact render={props=><VendorSignup {...props}/>}/>
            <Route path="/user-home" exact render={props=><UserHome {...props}/>}/>
            <Route path="/vendor-home" exact render={props=><VendorHome {...props}/>}/>
            <Route path="/upload-product" exact render={props=><UploadProduct {...props}/>}/>
          </Switch>
        </Router>
      <Footer />
    </div>
  );
}

export default App;
