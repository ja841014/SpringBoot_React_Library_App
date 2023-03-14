import React from 'react';
import './App.css';
import { Navbar } from './layouts/NavbarAndFooter/Navbar';
import { Footer } from './layouts/NavbarAndFooter/Footer';
import { HomePage } from './layouts/HomePage/HomePage';
import { SearchBookPage } from './layouts/SearchBookPage/SearchBookPage';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import { BookCheckoutPage } from './layouts/BookCheckoutPage/BookCheckoutPage';

import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import { Security, LoginCallback, SecureRoute } from '@okta/okta-react';

import { oktaConfig } from './lib/oktaConfig';
import LoginWidget from './Auth/LoginWidget';

export const App = () => {

  const oktaAuth = new OktaAuth(oktaConfig);

  const history = useHistory();
  
  // https://github.com/okta/okta-react
  const customAuthHandler = () => {
    history.push('/login');
  }

  const restoreOriginalUri = async (_oktaAuth: any, originalUri: any) => {
    history.replace(toRelativeUrl(originalUri || '/', window.location.origin));
  };

  return (
    <div className='d-flex flex-column min-vh-100'>
      <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri} onAuthRequired={customAuthHandler}>
        <Navbar/>
          <div className='flex-grow-1'>
            <Switch>
              
              <Route path='/' exact>
                <Redirect to={'/home'}/>
              </Route>

              <Route path={'/home'}>
                <HomePage/>
              </Route>

              <Route path={'/search'}>
                <SearchBookPage/>
              </Route>

              <Route path={'/checkout/:bookId'}>
                <BookCheckoutPage/>
              </Route>

              <Route path='/login' render={() => <LoginWidget oktaConfig={oktaConfig} /> } />
              
              <Route path='/login/callback' component={LoginCallback} />

              {/* <SecureRoute path='/shelf'> <ShelfPage/> </SecureRoute>
              <SecureRoute path='/messages'> <MessagesPage/> </SecureRoute>
              <SecureRoute path='/admin'> <ManageLibraryPage/> </SecureRoute> */}

            </Switch>
          </div>
        <Footer/>
      </Security>
    </div>
    
  );
}