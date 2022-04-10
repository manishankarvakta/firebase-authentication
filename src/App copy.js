import './App.css';
import app from './firebase.init';
import {getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signOut} from 'firebase/auth'
import { useState } from 'react';

const auth = getAuth(app);

function App() {
  const [user, setUser] = useState({});
  const googleProvider = new GoogleAuthProvider();
  const gitHubProvider = new GithubAuthProvider();

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
    .then(result => {
      const user = result.user;
      setUser(user);
      console.log(user)
    })
    .catch(error => {
      console.log(`Error: ${error}`);
    })
  }

  const handlSignOut = ()=> {
    signOut(auth)
    .then(()=>{
      setUser({});
    })
    .catch((error)=>{
      console.error(error);
    })
  }

  const handleGithubSignIn = () => {
    signInWithPopup(auth, gitHubProvider)
    .then(result => {
      const user = result.user;
      setUser(user);
      console.log(user)
    })
    .catch(error => {
      console.log(`Error: ${error}`);
    })
  }
  return (
    <div className="App">
      <h1>firebase auth</h1>
      {
        user.uid ? <button onClick={handlSignOut}>Sign Out</button>
        : <div>
          <button onClick={handleGoogleSignIn}>Signin with google</button>
          <button onClick={handleGithubSignIn}>Signin with gitHub</button>
        </div>
        
      }
      <h1>{user.displayName}</h1>
      <p>Email: {user.email}</p>
      <img src={user.photoURL} />
    </div>
  );
}

export default App;
