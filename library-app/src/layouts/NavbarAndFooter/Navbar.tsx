// import { Link, NavLink } from "react-router-dom";
// import { useOktaAuth } from '@okta/okta-react';
// import { SpinnerLoading } from "../Utils/SpinnerLoading";

export const Navbar = () => {
  return (
    <nav className='navbar navbar-expand-lg navbar-dark main-color py-3'>
      <div className='container-fluid'>
        <span className='navbar-brand'>Luv 2 Read</span>
        <button className='navbar-toggler' type='button'
          data-bs-toggle='collapse' data-bs-target='#navbarNavDropdown'
          aria-controls='navbarNavDropdown' aria-expanded='false'
          aria-label='Toggle Navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarNavDropdown'>
          <ul className='navbar-nav'>
            <li className='nav-item'>
              <a className="nav-link" href="#">Home</a>
            </li>
            <li className='nav-item'>
              <a className="nav-link" href="#">Search Book</a>
            </li>
          </ul>
          <ul className='navbar-nav ms-auto'>
            <li className="nav-item m-1"></li>
            <a type="button" className="btn btn-outline-light" href="#">Sign in</a>
          </ul>
        </div>
      </div>
    </nav>
  );
}