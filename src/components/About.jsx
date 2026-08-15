import {
  contact,
  education,
  experience,
  personalInfo,
  profile,
  skills,
  stats,
} from '../data/portfolioData'
import ResumeBox from './ResumeBox'
import SkillLogo from './SkillLogo'
import TitleSection from './TitleSection'

const VALUE_CLASS = 'value d-block d-sm-inline-block d-lg-block d-xl-inline-block'

function InfoList({ items }) {
  return (
    <ul className="about-list list-unstyled open-sans-font">
      {items.map((item) => (
        <li key={item.label}>
          <span className="title">{item.label} :</span>{' '}
          <span className={VALUE_CLASS}>{item.value}</span>
        </li>
      ))}
    </ul>
  )
}

export default function About() {
  const half = Math.ceil(personalInfo.length / 2)

  return (
    <>
      <TitleSection lead="ABOUT" highlight="ME" watermark="Resume" />

      <div className="about">
        <div className="main-content">
          <div className="container">
            <div className="row">
              {/* Personal info */}
              <div className="col-12 col-lg-5 col-xl-6">
                <div className="row">
                  <div className="col-12">
                    <h3 className="text-uppercase custom-title mb-0 ft-wt-600">
                      personal infos
                    </h3>
                  </div>
                  <div className="col-12 d-block d-sm-none">
                    <img
                      src={profile.mobileImage}
                      className="img-fluid main-img-mobile"
                      alt="my picture"
                    />
                  </div>
                  <div className="col-6">
                    <InfoList items={personalInfo.slice(0, half)} />
                  </div>
                  <div className="col-6">
                    <InfoList items={personalInfo.slice(half)} />
                  </div>
                  <div className="col-12 mt-3">
                    <h3 className="text-uppercase custom-title mb-0 ft-wt-600">
                      Socials
                    </h3>
                  </div>
                  <div className="col-12">
                    <div className="contact">
                      <div className="m-15px-tb">
                        <ul className="social list-unstyled pt-1 mb-0">
                          {contact.socials.map((social) => (
                            <li key={social.name} className={social.name.toLowerCase()}>
                              <a title={social.name} href={social.url} target='_blank'>
                                <i className={`fa ${social.icon}`} />
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  {/* <div className="col-12 mt-3">
                    <a className="button" href={profile.cvUrl}>
                      <span className="button-text">Download CV</span>
                      <span className="button-icon fa fa-download" />
                    </a>
                  </div> */}
                </div>
              </div>

              {/* Stat boxes */}
              <div className="col-12 col-lg-7 col-xl-6 mt-5 mt-lg-0">
                <div className="row">
                  {stats.map((stat, index) => (
                    <div className="col-6" key={stat.label2}>
                      <div className={`box-stats${index < 2 ? ' with-margin' : ''}`}>
                        <h3 className="poppins-font position-relative">{stat.value}</h3>
                        <p className="open-sans-font m-0 position-relative text-uppercase">
                          {stat.label} <span className="d-block">{stat.label2}</span>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <hr className="separator" />

            {/* Experience & education */}
            <div className="row">
              <div className="col-12">
                <h3 className="text-uppercase pb-5 mb-0 text-left text-sm-center custom-title ft-wt-600">
                  Experience <span>&amp;</span> Education
                </h3>
              </div>
              <div className="col-lg-6 m-15px-tb">
                <ResumeBox items={experience} icon="fa-briefcase" />
              </div>
              <div className="col-lg-6 m-15px-tb">
                <ResumeBox items={education} icon="fa-graduation-cap" />
              </div>
            </div>

            <hr className="separator mt-1" />

            {/* Skills */}
            <div className="row">
              <div className="col-12">
                <h3 className="text-uppercase pb-4 pb-sm-5 mb-3 mb-sm-0 text-left text-sm-center custom-title ft-wt-600">
                  My Skills
                </h3>
              </div>
              {skills.map((skill) => (
                <div className="col-6 col-md-3 mb-3 mb-sm-5" key={skill.name}>
                  <SkillLogo src={skill.logo} name={skill.name} />
                  <h6 className="text-uppercase open-sans-font text-center mt-2 mt-sm-4">
                    {skill.name}
                  </h6>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
