import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage  from './pages/shop/shop.component';
import SignInAndSignOutPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CheckoutPage from './pages/checkout/checkout.component';
import Header from './components/header/header.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selector';

class App extends React.Component {
  // we dont need anymore because we are using redux
/*constructor() {
  super();

  this.state = {
    currentUser: null
  };
}*/

unsubscribeFromAuth = null;

componentDidMount() {
  const { setCurrentUser } = this.props;
  
this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
  //if there is an user authenticate
    if (userAuth) {
      //create an user on database
      const userRef = await createUserProfileDocument(userAuth);
      //whenever our user snapshot updates we are setting the user reducer value with our new obj
      userRef.onSnapshot(snapShot => {
        setCurrentUser ({
            id: snapShot.id,
            ...snapShot.data()
          })
        });
    } else {
      setCurrentUser(userAuth);
    }
  });
}

componentWillUnmount() {
  this.unsubscribeFromAuth();
}

  render(){
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/shop' component={ShopPage} />
          <Route exact path='/checkout' component={CheckoutPage} />
          <Route 
            exact 
            path='/signin' 
            render={() => 
              this.props.currentUser ? (
                <Redirect to='/' />
              ) : (
                <SignInAndSignOutPage />
              )
            } 
          />
        </Switch>
      </div>
    );
  }
}

//access to this.props.currentUser
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
  //dispatch is a way to redux to know that whatever obj we pass is going to be an action obj that will be
  //passed to every reducer
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
