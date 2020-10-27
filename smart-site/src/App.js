
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import  Home  from './components/home';
import { Route } from 'react-router-dom';
import { SignIn } from './components/signin';
import Header from './components/header';
import { Footer } from './components/footer';
import { Customer } from './components/customer';

function App() {
  return (
    <div className="App">
<<<<<<< HEAD
=======
      
>>>>>>> 30c93e3e3e857c976021d4d968cca16cdaf8fd4a
      <Route path="/" exact>
        <Header />
        <Home />
        <Footer />
      </Route>
      <Route path="/signin" exact>
        <Header />
        <SignIn />
        <Footer />
      </Route>
<<<<<<< HEAD
      <Route path="/customer" exact>
        <Customer />
=======
<<<<<<< HEAD
=======
      <Route path="/admin" exact>
        <Admin />
>>>>>>> 4cd0917ea5a3e0512a824ae27df997d79e88b375
      </Route>
      
>>>>>>> 30c93e3e3e857c976021d4d968cca16cdaf8fd4a
    </div>
  );
}

export default App;
