import { useEffect, useRef, useState } from 'react'
import { projects } from '../data/portfolioData'
import useHoverDir from '../hooks/useHoverDir'
import useMasonry from '../hooks/useMasonry'
import Slideshow from './Slideshow'
import TitleSection from './TitleSection'

export default function Portfolio({ onSlideshowToggle }) {
  const gridRef = useRef(null)
  const [isOpen, setIsOpen] = useState(false)
  const [current, setCurrent] = useState(0)

  useMasonry(gridRef)
  useHoverDir(gridRef, 'figure')

  // The nav icons and mobile burger hide while the lightbox is up (custom.js).
  useEffect(() => {
    onSlideshowToggle(isOpen)
  }, [isOpen, onSlideshowToggle])

  return (
    <div className="portfolio">
      <TitleSection lead="my" highlight="project" watermark="works" />

      <div className="main-content text-center">
        <div
          id="grid-gallery"
          className={`container grid-gallery${isOpen ? ' slideshow-open' : ''}`}
        >
          <div className="grid-wrap">
            <ul className="grid gridlist" ref={gridRef}>
              {projects.map((project, index) => (
                <li
                  key={`${project.title}-${index}`}
                  onClick={() => {
                    setCurrent(index)
                    setIsOpen(true)
                  }}
                >
                  <figure>
                    <img src={project.thumb} alt="Portfolio Image" />
                    <div>
                      <span>{project.title}</span>
                    </div>
                  </figure>
                </li>
              ))}
            </ul>
          </div>

          <Slideshow
            projects={projects}
            isOpen={isOpen}
            current={current}
            onNavigate={setCurrent}
            onClose={() => setIsOpen(false)}
          />
        </div>
      </div>
    </div>
  )
}
