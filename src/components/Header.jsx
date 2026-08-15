export const NAV_ITEMS = [
  { id: 'home', label: 'Home', desktopIcon: 'fa-home', mobileIcon: 'fa-home' },
  { id: 'about', label: 'About', desktopIcon: 'fa-user', mobileIcon: 'fa-user' },
  {
    id: 'portfolio',
    label: 'Project',
    desktopIcon: 'fa-briefcase',
    mobileIcon: 'fa-folder-open',
  },
  /* Contact and Blog are hidden. Contact details now live at the bottom of the
     About page; the Blog had no articles to show. To bring either back, restore
     its entry here and the matching component in App.jsx - the two lists are
     indexed together, so keep them in the same order:
     { id: 'contact', label: 'Contact', desktopIcon: 'fa-envelope-open', mobileIcon: 'fa-envelope-open' },
     { id: 'blog', label: 'Blog', desktopIcon: 'fa-comments', mobileIcon: 'fa-comments' }, */
]

export default function Header({
  currentIndex,
  onNavigate,
  hidden,
  mobileMenuOpen,
  onToggleMobileMenu,
}) {
  return (
    <header className={`header${hidden ? ' hide-header' : ''}`} id="navbar-collapse-toggle">
      {/* Fixed desktop navigation */}
      <ul id="desktop-nav" className="icon-menu d-none d-lg-block">
        {NAV_ITEMS.map((item, index) => (
          <li
            key={item.id}
            className={`icon-box desktop-nav-element${index === currentIndex ? ' active' : ''}`}
            onClick={() => onNavigate(index)}
          >
            <i className={`fa ${item.desktopIcon}`} />
            <div>
              <h2>{item.label}</h2>
            </div>
          </li>
        ))}
      </ul>

      {/* Mobile navigation */}
      <nav className="d-block d-lg-none">
        <div className="inputmobile" id="inputmobile">
          <div
            id="trigger-mobile"
            className={`trigger-mobile${mobileMenuOpen ? ' show-menu' : ''}${
              hidden ? ' hide-trigger' : ''
            }`}
            onClick={onToggleMobileMenu}
          >
            <span />
            <span />
            <span />
          </div>
          <ul
            className={`list-unstyled${mobileMenuOpen ? ' hide-list' : ''}`}
            id="mobile-nav"
          >
            {NAV_ITEMS.map((item, index) => (
              <li
                key={item.id}
                className={`mobile-nav-element${index === currentIndex ? ' active' : ''}`}
                onClick={() => onNavigate(index, { fromMobile: true })}
              >
                <div>
                  <i className={`fa ${item.mobileIcon}`} />
                  <span>{item.label}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  )
}
