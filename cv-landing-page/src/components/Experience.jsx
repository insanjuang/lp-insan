import { cvData } from '../data/cvData'

const Experience = () => {
  const { experience } = cvData

  return (
    <section className="section experience">
      <h2>
        <i className="fas fa-briefcase"></i> Pengalaman Kerja
      </h2>
      {experience.map((job, index) => (
        <div key={index} className="experience-item">
          <div className="experience-header">
            <h3>{job.title}</h3>
            <span className="company">{job.company}</span>
            <span className="period">{job.period}</span>
          </div>
          <ul className="experience-details">
            {job.responsibilities.map((responsibility, idx) => (
              <li key={idx}>{responsibility}</li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  )
}

export default Experience