import React from 'react';
// import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './navbar';
import pancake from '../images/8bitPC.jpg'; 
import Login from './oauth';

import '../css/jobs.css';

class Jobs extends React.Component {



  render (){
    return (
      <div className="job-App">
        <NavBar />


        <header className="job-header">
          <h2> Jobs</h2>
        <div className="job-hero-image-container">
          <br></br>
          </div>
          <div className="job-hero-image-container">
            <br></br>
          </div>
          <div className="job-hero-image-container">
            <br></br>
          </div>
         
        </header>
           
      </div>
     
  );
  }
}

export default Jobs;