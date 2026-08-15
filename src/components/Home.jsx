import { profile } from '../data/portfolioData'

export default function Home({ onAboutClick }) {
  return (
    <div className="home">
      <div className="container-fluid main-container container-home p-0">
        <div className="color-block d-none d-lg-block" />
        <div className="row home-details-container align-items-center">
          <img
            className="col-lg-4 position-fixed d-none d-lg-block"
            src={profile.desktopImage}
            alt=""
          />
          <div className="col-12 col-lg-8 offset-lg-4 home-details text-left text-sm-center text-lg-left">
            <div>
              <img
                src={profile.mobileImage}
                className="img-fluid main-img-mobile d-none d-sm-block d-lg-none"
                alt="my picture"
              />
              <h1 className="text-uppercase poppins-font">
                I&apos;m {profile.firstName} {profile.lastName}. <span>{profile.role}</span>
              </h1>
              <p className="open-sans-font">{profile.intro}</p>
              <a id="link-about" className="button" onClick={onAboutClick}>
                <span className="button-text">more about me</span>
                <span className="button-icon fa fa-arrow-right" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
