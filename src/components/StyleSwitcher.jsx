import { useState } from 'react'

const SKINS = [
  'purple',
  'red',
  'blueviolet',
  'blue',
  'goldenrod',
  'magenta',
  'yellowgreen',
  'orange',
  'green',
  'yellow',
]

const SWATCHES = {
  purple: '#800080',
  red: '#f44336',
  blueviolet: '#8a2be2',
  blue: '#1976d2',
  goldenrod: '#daa520',
  magenta: '#ff00ff',
  yellowgreen: '#9acd32',
  orange: '#ff8c00',
  green: '#4caf50',
  yellow: '#ffb400',
}

/* Rows mirror the template's 3x3 arrow pad (the middle cell is empty). */
const DIRECTION_ROWS = [
  [
    { id: 'cornertopleft', icon: 'fa-arrow-up' , rotate: -45 },
    { id: 'top', icon: 'fa-arrow-up', rotate: 0 },
    { id: 'cornertopright', icon: 'fa-arrow-up', rotate: 45 },
  ],
  [
    { id: 'left', icon: 'fa-arrow-up', rotate: -90 },
    null,
    { id: 'right', icon: 'fa-arrow-up', rotate: 90 },
  ],
  [
    { id: 'cornerbottomleft', icon: 'fa-arrow-up', rotate: -135 },
    { id: 'bottom', icon: 'fa-arrow-up', rotate: 180 },
    { id: 'cornerbottomright', icon: 'fa-arrow-up', rotate: 135 },
  ],
]

/**
 * Demo-only panel for changing the accent colour, light/dark theme, and the
 * direction the page-transition layers sweep from.
 */
export default function StyleSwitcher({
  skin,
  onSkinChange,
  theme,
  onThemeChange,
  direction,
  onDirectionChange,
}) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div id="switcher" className={open ? 'show' : ''}>
        <div className="content-switcher">
          <button id="hideSwitcher" onClick={() => setOpen(false)} aria-label="Close">
            &times;
          </button>

          <h4>COLOR SWITCHER</h4>
          <ul>
            {SKINS.map((name) => (
              <li key={name}>
                <button
                  type="button"
                  title={name}
                  aria-label={name}
                  aria-pressed={skin === name}
                  style={{ backgroundColor: SWATCHES[name] }}
                  onClick={() => onSkinChange(name)}
                />
              </li>
            ))}
          </ul>

          <h4>THEME</h4>
          <div className="theme-toggle">
            {['dark', 'light'].map((name) => (
              <button
                key={name}
                type="button"
                aria-pressed={theme === name}
                onClick={() => onThemeChange(name)}
              >
                {name}
              </button>
            ))}
          </div>

          <h4>TRANSITION DIRECTION</h4>
          {DIRECTION_ROWS.map((row, rowIndex) => (
            <div className="transition-direction" key={rowIndex}>
              {row.map((cell, cellIndex) =>
                cell ? (
                  <button
                    key={cell.id}
                    type="button"
                    title={cell.id}
                    aria-label={cell.id}
                    aria-pressed={direction === cell.id}
                    onClick={() => onDirectionChange(cell.id)}
                  >
                    <i
                      className={`fa ${cell.icon}`}
                      style={{ transform: `rotate(${cell.rotate}deg)` }}
                    />
                  </button>
                ) : (
                  <span className="spacer" key={`spacer-${cellIndex}`} />
                )
              )}
            </div>
          ))}

          <span>Navigate between sections to see the effect.</span>
        </div>
      </div>

      <button
        id="showSwitcher"
        className="styleSecondColor"
        onClick={() => setOpen(true)}
        aria-label="Open style switcher"
      >
        <i className="fa fa-cog fa-spin" />
      </button>
    </>
  )
}
