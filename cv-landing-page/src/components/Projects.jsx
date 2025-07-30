import { cvData } from '../data/cvData'

const Projects = () => {
  const { projects } = cvData

  return (
    <section className="section projects">
      <h2>
        <i className="fas fa-project-diagram"></i> Proyek
      </h2>
      {projects.map((project, index) => (
        <div key={index} className="project-item">
          <h3>{project.title}</h3>
          <p>{project.description}</p>
          <div className="project-tech">
            {project.technologies.map((tech, idx) => (
              <span key={idx} className="tech-tag">
                {tech}
              </span>
            ))}
          </div>
        </div>
      ))}
    </section>
  )
}

export default Projects