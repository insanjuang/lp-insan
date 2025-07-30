import { cvData } from '../data/cvData'

const About = () => {
  return (
    <section className="section about">
      <h2>
        <i className="fas fa-user-circle"></i> Tentang Saya
      </h2>
      <p>{cvData.about}</p>
    </section>
  )
}

export default About