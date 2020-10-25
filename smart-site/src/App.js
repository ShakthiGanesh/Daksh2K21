import { Footer } from './components/footer';
import Header from './components/header';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Home } from './components/home';
import { Route } from 'react-router-dom';
import { SignIn } from './components/signin';

function App() {
  return (
    <div className="App">
      <Header />
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="signin" exact>
        <SignIn />
      </Route>
      <Footer />
    </div>
  );
}

export default App;
