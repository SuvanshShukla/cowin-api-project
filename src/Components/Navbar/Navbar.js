import React from 'react';
import "papercss/dist/paper.css"
// import 'papercss';

const navbar = () => {

    return(
        <nav className="border fixed split-nav">
        <div className="nav-brand">
          <h3><a href="#">COWIN Check</a></h3>
        </div>
        <div className="collapsible">
          <input id="collapsible1" type="checkbox" name="collapsible1" />
          <label for="collapsible1">
            <div className="bar1"></div>
            <div className="bar2"></div>
            <div className="bar3"></div>
          </label>
          <div className="collapsible-body">
            <ul className="inline">
              <li><a href="#">Documentation</a></li>
              <li><a href="#">About</a></li>
              <li><a href="https://github.com/SuvanshShukla" target="_blank" rel="noreferrer">Github</a></li>
            </ul>
          </div>
        </div>
      </nav>
    );
}


export default navbar;