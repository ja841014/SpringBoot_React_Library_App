import { Redirect } from 'react-router-dom';

import { useOktaAuth } from '@okta/okta-react';
import OktaSignInWidget from './OktaSigninWidget';

const LoginWidget = ({oktaConfig}) => {
    console.log("LoginWidget config");
    console.log(oktaConfig);
    /**
     * 
     * useOktaAuth - gives an object with two properties:
     *     oktaAuth - the Okta Auth SDK instance.
     *     authState - the AuthState object that shows the current authentication state of the user to your app (initial state is null).
     */
    const { oktaAuth, authState } = useOktaAuth();
    const onSuccess = (tokens) => {
        console.log(tokens);
        oktaAuth.handleLoginRedirect(tokens);
    }

    const onError = (err) => {
        console.log('sign in error: ', err);
    }
    if (!authState) {
        return (
            <spinnerLoading/>
        );
    }
    return authState.isAuthenticated ?
    <Redirect to = {{pathname: '/'}}/>
    :
    <OktaSignInWidget oktaConfig = { oktaConfig } onSuccess = { onSuccess } onError = { onError }/>
}

export default LoginWidget;