import logo from './logo.svg';
import './App.css';
import Home from './componentes/home.jsx';
import Navbar from './componentes/navbar.jsx';
import Footer from './componentes/footer.jsx';
import Form from './componentes/form.jsx';
import FormList from './componentes/formlist.jsx';

function App() {
  return (
    <>
    <Navbar />
    <div className="pt-20 animate-fade">
      <Home />
    </div>
    <Footer />
    {/* <Form /> */}
    {/* <FormList /> */}
    </>
  );
}

export default App;
