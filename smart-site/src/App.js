
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import  Home  from './components/home';
import { Route } from 'react-router-dom';
import { SignIn } from './components/signin';
import Header from './components/header';
import { Footer } from './components/footer';
import { Admin } from './components/admin';
import CreateWork from './components/workForm';
import CreateDepartment from './components/departmentForm';

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
    </div>
  );
}

export default App;
