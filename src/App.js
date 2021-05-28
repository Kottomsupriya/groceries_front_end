import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login/login';
import Homepage from './components/Homepage/homepage';
import UserSignup from './components/Signup/user_signup';
import VendorSignup from './components/Signup/vendor_signup';
import UploadProduct from './components/UploadProduct/UploadProduct';
import VendorHomepage from './components/Vendor_Homepage/vendor_homepage'
import ViewStock from './components/ViewStock/viewStock'
import UploadStock from './components/UploadStock/uploadStock'
import Footer from './components/Footer/footer';
import Header from './components/Header/header';
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
            <Route path="/upload-product" exact render={props=><UploadProduct {...props}/>}/>
            <Route path="/vendor-home" exact render={props=><VendorHomepage {...props}/>}/>
            <Route path="/upload-stock" exact render={props=><UploadStock {...props}/>}/>
            <Route path="/view-stock" exact render={props=><ViewStock {...props}/>}/>
          </Switch>
        </Router>
      <Footer />
    </div>
  );
}

export default App;
