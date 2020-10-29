
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import  Home  from './components/home';
import { Route } from 'react-router-dom';
import { SignIn } from './components/signin';
import Header from './components/header';
import { Footer } from './components/footer';
<<<<<<< HEAD
import { Admin } from './components/admin';
import CreateWork from './components/workForm';
import CreateDepartment from './components/departmentForm';
=======
import { Customer } from './components/customer';
>>>>>>> 4f832fad24923dcb527ff968db0ff94ebbbb25e5

function App() {
  return (
    <div className="App">
<<<<<<< HEAD
=======
      
>>>>>>> 4f832fad24923dcb527ff968db0ff94ebbbb25e5
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
=======
      <Route path="/customer" exact>
        <Customer />
      </Route>
      
>>>>>>> 4f832fad24923dcb527ff968db0ff94ebbbb25e5
    </div>
  );
}

export default App;
