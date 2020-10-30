
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import  Home  from './components/home';
import { Route } from 'react-router-dom';
import { SignIn } from './components/signin';
import Header from './components/header';
import { Footer } from './components/footer';
import { Customer } from './components/customer';
import { Plans } from './components/plans';
<<<<<<< HEAD
import Project from './components/projectPage';
=======
import Contact from './components/contact';
>>>>>>> 9da8aa1893e26407c2f4b0c3e438a523235b5dfa

function App() {
  return (
    <div className="App">
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
      <Route path='/plans' exact>
        <Header />
        <Plans />
        <Footer />
      </Route>
      <Route path="/customer" exact>
        <Customer />
      </Route>
<<<<<<< HEAD
      <Route path="/test" exact>
        <Project project_id="daf"/>
=======
      <Route path='/contactus'>
        <Header />
        <Contact />
        <Footer />
>>>>>>> 9da8aa1893e26407c2f4b0c3e438a523235b5dfa
      </Route>
      
    </div>
  );
}

export default App;
