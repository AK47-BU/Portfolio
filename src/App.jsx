import "./App.css"
import { MotionConfig } from "framer-motion";
import { NavBar } from "./components/NavBar";
import { Banner } from "./components/Banner"
import "bootstrap/dist/css/bootstrap.min.css";
import { ScrollProgress } from "./components/ScrollProgress";
import { About } from "./components/About";
import { Skills } from "./components/Skills";
import { Projects } from "./components/Projects.jsx"
import { Contact } from "./components/Contact.jsx"
import { Footer } from "./components/Footer.jsx"

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <div className='App'>
        <ScrollProgress />
        <NavBar />
        <Banner />
        <About />
        <Skills />
        <Projects />
        <Contact />
        <Footer />
      </div>
    </MotionConfig>
  )
}

export default App
