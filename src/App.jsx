import "./App.css"
import { NavBar } from "./components/NavBar";
import {Banner} from "./components/Banner"
import "bootstrap/dist/css/bootstrap.min.css";
import { Skills } from "./components/Skills";
import {Projects} from "./components/Projects.jsx"
import {Contact} from "./components/Contact.jsx"

function App() {
  return (
    <div className='App'>
      <NavBar/>
      <Banner />
      <Skills />
      <Projects />
      <Contact />
    </div>
  )
}

export default App
