import { cvData } from '../data/cvData'

const Skills = () => {
  const { skills } = cvData

  return (
    <section className="section skills">
      <h2>
        <i className="fas fa-code"></i> Keahlian Teknis
      </h2>
      <div className="skills-grid">
        {Object.entries(skills).map(([category, skillList]) => (
          <div key={category} className="skill-category">
            <h3>{category}</h3>
            <div className="skill-tags">
              {skillList.map((skill, index) => (
                <span key={index} className="skill-tag">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Skills