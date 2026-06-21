import "./App.css"
import { NavBar } from "./components/NavBar";
import { Banner } from "./components/Banner"
import "bootstrap/dist/css/bootstrap.min.css";
import { About } from "./components/About";
import { Skills } from "./components/Skills";
import { Projects } from "./components/Projects.jsx"
import { Contact } from "./components/Contact.jsx"
import { Footer } from "./components/Footer.jsx"

function App() {
  return (
    <div className='App'>
      <NavBar />
      <Banner />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </div>
  )
}

export default App
