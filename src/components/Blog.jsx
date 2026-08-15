import { useState } from 'react'
import { posts } from '../data/portfolioData'
import TitleSection from './TitleSection'

const PAGES = [1, 2, 3, 4]

export default function Blog() {
  const [page, setPage] = useState(2)

  return (
    <div className="blog">
      <TitleSection lead="my" highlight="blog" watermark="posts" />

      <div className="main-content">
        <div className="container">
          <div className="row">
            {posts.map((post) => (
              <div className="col-12 col-md-6 col-lg-6 col-xl-4 mb-30" key={post.title}>
                <article className="post-container">
                  <div className="post-thumb">
                    <a
                      href={post.url}
                      className="d-block position-relative overflow-hidden"
                    >
                      <img src={post.image} className="img-fluid" alt={post.title} />
                    </a>
                  </div>
                  <div className="post-content">
                    <div className="entry-header">
                      <h3>
                        <a href={post.url}>{post.title}</a>
                      </h3>
                    </div>
                    <div className="entry-content open-sans-font">
                      <p>{post.excerpt}</p>
                    </div>
                  </div>
                </article>
              </div>
            ))}

            {/* Pagination — static, wire up to your own routing if you add posts */}
            <div className="col-12 mt-4">
              <nav>
                <ul className="pagination justify-content-center mb-0">
                  {PAGES.map((n) => (
                    <li className={`page-item${n === page ? ' active' : ''}`} key={n}>
                      <a
                        className="page-link"
                        href="#"
                        onClick={(ev) => {
                          ev.preventDefault()
                          setPage(n)
                        }}
                      >
                        {n}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
