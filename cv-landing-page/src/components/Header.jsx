import { cvData } from '../data/cvData'

const Header = () => {
  const { personal } = cvData

  return (
    <header className="header">
      <div className="profile-section">
        <div className="profile-image">
          <i className="fas fa-user"></i>
        </div>
        <div className="profile-info">
          <h1>{personal.name}</h1>
          <p className="title">{personal.title}</p>
          <p className="location">
            <i className="fas fa-map-marker-alt"></i> {personal.location}
          </p>
        </div>
      </div>
      <div className="contact-info">
        <a href={`mailto:${personal.email}`} className="contact-item">
          <i className="fas fa-envelope"></i>
          <span>{personal.email}</span>
        </a>
        <a href={personal.linkedin} className="contact-item" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-linkedin"></i>
          <span>linkedin.com/in/sugamaulana</span>
        </a>
        <a href={personal.github} className="contact-item" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-github"></i>
          <span>github.com/yourusername</span>
        </a>
      </div>
    </header>
  )
}

export default Header