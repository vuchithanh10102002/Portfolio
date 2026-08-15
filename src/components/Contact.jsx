import { useState } from 'react'
import { contact } from '../data/portfolioData'
import TitleSection from './TitleSection'

const EMPTY = { name: '', email: '', subject: '', message: '' }

export default function Contact() {
  const [values, setValues] = useState(EMPTY)
  const [status, setStatus] = useState({ type: '', text: '' })

  const update = (field) => (ev) =>
    setValues((prev) => ({ ...prev, [field]: ev.target.value }))

  /* This is a static site — there is no backend to POST to. Swap this handler
     for a fetch() to your form service (Formspree, Netlify Forms, your own
     endpoint) when you deploy. */
  const onSubmit = (ev) => {
    ev.preventDefault()

    if (!values.name || !values.email || !values.message) {
      setStatus({ type: 'error', text: 'Please fill in name, email and message' })
      return
    }

    setStatus({ type: '', text: 'Sending...' })
    setTimeout(() => {
      setStatus({ type: 'success', text: 'Message Sent!' })
      setValues(EMPTY)
    }, 600)
  }

  return (
    <div className="contact">
      <TitleSection lead="get in" highlight="touch" watermark="contact" />

      <div className="main-content">
        <div className="container">
          <div className="row">
            {/* Left side */}
            <div className="col-12 col-lg-4">
              <h3 className="text-uppercase custom-title mb-0 ft-wt-600 pb-3">
                Don&apos;t be shy !
              </h3>
              <p className="open-sans-font mb-3">
                Feel free to get in touch with me. I am always open to discussing new
                projects, creative ideas or opportunities to be part of your visions.
              </p>
              <p className="open-sans-font custom-span-contact position-relative">
                <i className="fa fa-envelope-open position-absolute" />
                <span className="d-block">mail me</span>
                {contact.email}
              </p>
              <p className="open-sans-font custom-span-contact position-relative">
                <i className="fa fa-phone-square position-absolute" />
                <span className="d-block">call me</span>
                {contact.phone}
              </p>
              <ul className="social list-unstyled pt-1 mb-5">
                {contact.socials.map((social) => (
                  <li key={social.name} className={social.name.toLowerCase()}>
                    <a title={social.name} href={social.url}>
                      <i className={`fa ${social.icon}`} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact form */}
            <div className="col-12 col-lg-8">
              <form className="contactform" onSubmit={onSubmit} noValidate>
                <div className="contactform">
                  <div className="row">
                    <div className="col-12 col-md-4">
                      <input
                        autoComplete="off"
                        type="text"
                        name="name"
                        placeholder="YOUR NAME"
                        value={values.name}
                        onChange={update('name')}
                      />
                    </div>
                    <div className="col-12 col-md-4">
                      <input
                        autoComplete="off"
                        type="email"
                        name="email"
                        placeholder="YOUR EMAIL"
                        value={values.email}
                        onChange={update('email')}
                      />
                    </div>
                    <div className="col-12 col-md-4">
                      <input
                        autoComplete="off"
                        type="text"
                        name="subject"
                        placeholder="YOUR SUBJECT"
                        value={values.subject}
                        onChange={update('subject')}
                      />
                    </div>
                    <div className="col-12">
                      <textarea
                        name="message"
                        placeholder="YOUR MESSAGE"
                        value={values.message}
                        onChange={update('message')}
                      />
                      <button type="submit" className="button">
                        <span className="button-text">send message</span>
                        <span className="button-icon fa fa-send" />
                      </button>
                    </div>
                    <div className="col-12 form-message">
                      <span
                        className={`output_message text-center font-weight-600 text-uppercase ${status.type}`}
                      >
                        {status.text}
                      </span>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
