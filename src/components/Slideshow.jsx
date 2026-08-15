import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'

/** Matches the CSS transition on `.slideshow ul.animatable > li`. */
const SLIDE_DURATION = 500
/** The original waited a tick between arming the transition and moving items. */
const ARM_DELAY = 25
const DEPTH = -150

function SlideMedia({ media, videoRef }) {
  const [slide, setSlide] = useState(0)

  if (media.type === 'youtube') {
    return (
      <div className="videocontainer">
        <iframe
          className="youtube-video"
          src={`https://www.youtube.com/embed/${media.id}?enablejsapi=1&version=3&playerapiid=ytplayer`}
          title="Project video"
          allowFullScreen
        />
      </div>
    )
  }

  if (media.type === 'video') {
    return (
      <video ref={videoRef} className="responsive-video" controls poster={media.poster}>
        <source src={media.src} type="video/mp4" />
      </video>
    )
  }

  if (media.type === 'carousel') {
    return (
      <div className="carousel slide portfolio-slider">
        <ol className="carousel-indicators">
          {media.images.map((src, i) => (
            <li
              key={src + i}
              className={i === slide ? 'active' : ''}
              onClick={() => setSlide(i)}
            />
          ))}
        </ol>
        <div className="carousel-inner">
          {media.images.map((src, i) => (
            <div className={`carousel-item${i === slide ? ' active' : ''}`} key={src + i}>
              <img src={src} alt={`slide ${i + 1}`} />
            </div>
          ))}
        </div>
      </div>
    )
  }

  return <img src={media.src} alt="Portfolio Image" />
}

/**
 * Port of cbpGridGallery's lightbox. Positions are derived from each item's
 * offset from the current slide rather than mutated imperatively, but the
 * geometry (viewport-width steps at -150px depth) is the template's.
 */
export default function Slideshow({ projects, isOpen, current, onNavigate, onClose }) {
  const [animatable, setAnimatable] = useState(false)
  const [itemWidth, setItemWidth] = useState(660)
  const [viewportWidth, setViewportWidth] = useState(
    typeof window === 'undefined' ? 0 : window.innerWidth
  )
  const animatingRef = useRef(false)
  const firstItemRef = useRef(null)
  const videoRef = useRef(null)

  const measure = useCallback(() => {
    setViewportWidth(window.innerWidth)
    if (firstItemRef.current?.offsetWidth) {
      setItemWidth(firstItemRef.current.offsetWidth)
    }
  }, [])

  useLayoutEffect(() => {
    if (isOpen) measure()
  }, [isOpen, measure])

  useEffect(() => {
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [measure])

  const stopVideos = useCallback(() => {
    const video = videoRef.current
    if (video && !video.paused && !video.ended) video.pause()

    document.querySelectorAll('.youtube-video').forEach((frame) => {
      frame.contentWindow?.postMessage(
        '{"event":"command","func":"pauseVideo","args":""}',
        '*'
      )
    })
  }, [])

  const navigate = useCallback(
    (dir) => {
      if (animatingRef.current) return
      stopVideos()

      if (
        (dir === 'next' && current === projects.length - 1) ||
        (dir === 'prev' && current === 0)
      ) {
        onClose()
        return
      }

      animatingRef.current = true
      setAnimatable(true)
      setTimeout(() => {
        onNavigate(dir === 'next' ? current + 1 : current - 1)
        setTimeout(() => {
          animatingRef.current = false
        }, SLIDE_DURATION)
      }, ARM_DELAY)
    },
    [current, onClose, onNavigate, projects.length, stopVideos]
  )

  const close = useCallback(() => {
    stopVideos()
    setAnimatable(false)
    onClose()
  }, [onClose, stopVideos])

  // Opening should snap items into place, not slide them.
  useEffect(() => {
    if (!isOpen) setAnimatable(false)
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    const onKeyDown = (ev) => {
      if (ev.keyCode === 37) navigate('prev')
      else if (ev.keyCode === 39) navigate('next')
      else if (ev.keyCode === 27) close()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [isOpen, navigate, close])

  const transformFor = (offset) => {
    if (offset === 0) return ''
    const step = viewportWidth / 2 + itemWidth / 2
    const extra = Math.abs(offset) === 2 ? viewportWidth / 2 : 0
    const distance = (step + extra) * Math.sign(offset)
    return `translate3d(${distance}px, 0, ${DEPTH}px)`
  }

  return (
    <div className="slideshow">
      <ul className={animatable ? 'animatable' : ''}>
        {projects.map((project, index) => {
          const offset = index - current
          const visible = isOpen && Math.abs(offset) <= 2
          return (
            <li
              key={`${project.title}-${index}`}
              ref={index === 0 ? firstItemRef : null}
              className={`${visible ? 'show' : ''}${
                isOpen && offset === 0 ? ' current' : ''
              }`}
              style={{ transform: isOpen ? transformFor(offset) : '' }}
            >
              <figure>
                <figcaption>
                  <h3>{project.title}</h3>
                  <div className="row open-sans-font">
                    <div className="col-12 col-sm-6 mb-2">
                      <i className="fa fa-file-text-o pr-2" />
                      <span className="project-label">Project </span>:{' '}
                      <span className="ft-wt-600 uppercase">{project.kind}</span>
                    </div>
                    <div className="col-12 col-sm-6 mb-2">
                      <i className="fa fa-user-o pr-2" />
                      <span className="project-label">Client </span>:{' '}
                      <span className="ft-wt-600 uppercase">{project.client}</span>
                    </div>
                    <div className="col-12 col-sm-6 mb-2">
                      <i className="fa fa-code pr-2" />
                      <span className="project-label">Langages </span>:{' '}
                      <span className="ft-wt-600 uppercase">{project.languages}</span>
                    </div>
                    <div className="col-12 col-sm-6 mb-2">
                      <i className="fa fa-external-link pr-2" />
                      <span className="project-label">Preview </span>:{' '}
                      <span className="ft-wt-600 uppercase">
                        <a href={project.previewUrl} target="_blank" rel="noreferrer">
                          {project.previewLabel}
                        </a>
                      </span>
                    </div>
                  </div>
                </figcaption>
                <SlideMedia
                  media={project.media}
                  videoRef={offset === 0 ? videoRef : undefined}
                />
              </figure>
            </li>
          )
        })}
      </ul>

      <nav>
        <span
          className="icon nav-prev fa fa-angle-left"
          role="button"
          aria-label="previous"
          onClick={() => navigate('prev')}
        />
        <span
          className="icon nav-next fa fa-angle-right"
          role="button"
          aria-label="next"
          onClick={() => navigate('next')}
        />
        <span
          className="nav-close fa fa-times"
          role="button"
          aria-label="close"
          onClick={close}
        />
      </nav>
    </div>
  )
}
