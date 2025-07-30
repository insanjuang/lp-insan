import './App.css'
import Header from './components/Header'
import About from './components/About'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Education from './components/Education'
import Projects from './components/Projects'
import Footer from './components/Footer'

function App() {
  return (
    <div className="app">
      <div className="container">
        <Header />
        <main className="main-content">
          <About />
          <Skills />
          <Experience />
          <Education />
          <Projects />
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default App
