import React, { useState, useEffect, useReducer, useContext } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../store/auth_context';
import Input from '../UI/Input/Input'

const emailReducer = (state, action) => {
  if (action.type === "USER_EMAIL") {
    return { value: action.val, isValid: action.val.includes('@') }
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.includes('@') }
  }
  return { value: "", isValid: false }
}

const passwordReducer = (state, action) => {
  if (action.type === "USER_PASSWORD") {
    return { value: action.val, isValid: action.val.trim().length > 6 }
  }
  if (action.type === "P_INPUT_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 6 }
  }
  return { value: "", isValid: false }
}


const Login = () => {

  const [formIsValid, setFormIsValid] = useState(false);


  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: false
  })

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: false
  })

  const ctx = useContext(AuthContext)

  useEffect(() => {
    console.log('EFFECT RUNNING');

    return () => {
      console.log('EFFECT CLEANUP');
    };
  }, []);

  // useEffect(() => {
  //   const identifier = setTimeout(() => {
  //     console.log('Checking form validity!');
  //     setFormIsValid(
  //       enteredEmail.includes('@') && enteredPassword.trim().length > 6
  //     );
  //   }, 500);

  //   return () => {
  //     console.log('CLEANUP');
  //     clearTimeout(identifier);
  //   };
  // }, [enteredEmail, enteredPassword]);

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "USER_EMAIL", val: event.target.value })

    setFormIsValid(
      emailState.isValid && passwordState.isValid
    );
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: "USER_PASSWORD", val: event.target.value })

    setFormIsValid(
      emailState.isValid && passwordState.isValid
    );
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: "INPUT_BLUR" })
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: "P_INPUT_BLUR" })
  };

  const submitHandler = (event) => {
    event.preventDefault();
    ctx.onLogIn(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input 
          type="email" 
          id="email"
          label="Email" 
          isValid={emailState.isValid} 
          value={emailState.value} 
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler} 
        />
        <Input 
          type="password" 
          id="password"
          label="Password" 
          isValid={passwordState.isValid} 
          value={passwordState.value} 
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler} 
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
