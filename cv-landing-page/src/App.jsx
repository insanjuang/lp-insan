import React from 'react'
import './App.css'

function App() {
  return (
    <div className="app">
      {/* Header Section */}
      <header className="header">
        <div className="container">
          <div className="profile-section">
            <div className="profile-image">
              <div className="placeholder-avatar">SM</div>
            </div>
            <div className="profile-info">
              <h1>Suga Maulana</h1>
              <h2>Backend Developer</h2>
              <p className="tagline">Passionate about building scalable server-side applications and robust APIs</p>
              <div className="contact-links">
                <a href="https://linkedin.com/in/sugamaulana" target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </a>
                <a href="mailto:your.email@example.com">Email</a>
                <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        <div className="container">
          {/* About Section */}
          <section className="section">
            <h3>About Me</h3>
            <p>
              Experienced Backend Developer with expertise in building scalable web applications 
              and RESTful APIs. Passionate about clean code, system architecture, and performance 
              optimization. Strong background in database design and server-side technologies.
            </p>
          </section>

          {/* Skills Section */}
          <section className="section">
            <h3>Technical Skills</h3>
            <div className="skills-grid">
              <div className="skill-category">
                <h4>Programming Languages</h4>
                <div className="skills-list">
                  <span className="skill-tag">JavaScript</span>
                  <span className="skill-tag">Python</span>
                  <span className="skill-tag">Java</span>
                  <span className="skill-tag">PHP</span>
                </div>
              </div>
              <div className="skill-category">
                <h4>Frameworks & Libraries</h4>
                <div className="skills-list">
                  <span className="skill-tag">Node.js</span>
                  <span className="skill-tag">Express.js</span>
                  <span className="skill-tag">Django</span>
                  <span className="skill-tag">Laravel</span>
                </div>
              </div>
              <div className="skill-category">
                <h4>Databases</h4>
                <div className="skills-list">
                  <span className="skill-tag">MySQL</span>
                  <span className="skill-tag">PostgreSQL</span>
                  <span className="skill-tag">MongoDB</span>
                  <span className="skill-tag">Redis</span>
                </div>
              </div>
              <div className="skill-category">
                <h4>Tools & Technologies</h4>
                <div className="skills-list">
                  <span className="skill-tag">Docker</span>
                  <span className="skill-tag">AWS</span>
                  <span className="skill-tag">Git</span>
                  <span className="skill-tag">Postman</span>
                </div>
              </div>
            </div>
          </section>

          {/* Experience Section */}
          <section className="section">
            <h3>Professional Experience</h3>
            <div className="experience-list">
              <div className="experience-item">
                <div className="experience-header">
                  <h4>Backend Developer</h4>
                  <span className="company">Your Company Name</span>
                  <span className="duration">2022 - Present</span>
                </div>
                <ul className="experience-description">
                  <li>Developed and maintained RESTful APIs serving 10k+ daily active users</li>
                  <li>Optimized database queries resulting in 40% performance improvement</li>
                  <li>Implemented microservices architecture using Docker and Kubernetes</li>
                  <li>Collaborated with frontend team to integrate APIs and ensure smooth user experience</li>
                </ul>
              </div>
              
              <div className="experience-item">
                <div className="experience-header">
                  <h4>Junior Backend Developer</h4>
                  <span className="company">Previous Company</span>
                  <span className="duration">2020 - 2022</span>
                </div>
                <ul className="experience-description">
                  <li>Built server-side applications using Node.js and Express.js</li>
                  <li>Designed and implemented database schemas for various projects</li>
                  <li>Created automated testing suites to ensure code quality</li>
                  <li>Participated in code reviews and agile development processes</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Projects Section */}
          <section className="section">
            <h3>Featured Projects</h3>
            <div className="projects-grid">
              <div className="project-card">
                <h4>E-commerce API</h4>
                <p>Complete REST API for e-commerce platform with user authentication, product management, and payment integration.</p>
                <div className="project-tech">
                  <span className="tech-tag">Node.js</span>
                  <span className="tech-tag">MongoDB</span>
                  <span className="tech-tag">JWT</span>
                </div>
              </div>
              
              <div className="project-card">
                <h4>Task Management System</h4>
                <p>Backend system for task management application with real-time notifications and team collaboration features.</p>
                <div className="project-tech">
                  <span className="tech-tag">Python</span>
                  <span className="tech-tag">Django</span>
                  <span className="tech-tag">PostgreSQL</span>
                </div>
              </div>
              
              <div className="project-card">
                <h4>Analytics Dashboard API</h4>
                <p>High-performance API for analytics dashboard with data aggregation and real-time reporting capabilities.</p>
                <div className="project-tech">
                  <span className="tech-tag">Java</span>
                  <span className="tech-tag">Spring Boot</span>
                  <span className="tech-tag">Redis</span>
                </div>
              </div>
            </div>
          </section>

          {/* Education Section */}
          <section className="section">
            <h3>Education</h3>
            <div className="education-item">
              <h4>Bachelor's Degree in Computer Science</h4>
              <span className="institution">Your University Name</span>
              <span className="duration">2016 - 2020</span>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>&copy; 2024 Suga Maulana. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
