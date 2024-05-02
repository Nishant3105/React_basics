import React, {useState, useEffect} from 'react'

const AuthContext = React.createContext({
    isLoggedIn: false,
    onLogOut: ()=>{},
    onLogIn: (email,password) => {}
})

export const AuthContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(()=>{
      let login_variable=localStorage.getItem('user_loggedin')
      
      if(login_variable)
      setIsLoggedIn(true);
    
    }, [])
  
    const loginHandler = (email, password) => {
      // We should of course check email and password
      // But it's just a dummy/ demo anyways
      localStorage.setItem('user_loggedin','1')
      setIsLoggedIn(true);
    };
  
    const logoutHandler = () => {
        localStorage.removeItem('user_loggedin')
        setIsLoggedIn(false);
    };

    return <AuthContext.Provider value={{
        isLoggedIn: isLoggedIn,
        onLogOut: logoutHandler,
        onLogIn: loginHandler
    }}>
        {props.children}
    </AuthContext.Provider>
}

export default AuthContext