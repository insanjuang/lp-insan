import { cvData } from '../data/cvData'

const Education = () => {
  const { education } = cvData

  return (
    <section className="section education">
      <h2>
        <i className="fas fa-graduation-cap"></i> Pendidikan
      </h2>
      {education.map((edu, index) => (
        <div key={index} className="education-item">
          <div className="education-header">
            <h3>{edu.degree}</h3>
            <span className="university">{edu.university}</span>
            <span className="period">{edu.period}</span>
          </div>
        </div>
      ))}
    </section>
  )
}

export default Education