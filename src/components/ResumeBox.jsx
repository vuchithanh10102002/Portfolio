export default function ResumeBox({ items, icon }) {
  return (
    <div className="resume-box">
      <ul>
        {items.map((item) => (
          <li key={`${item.time}-${item.title}`}>
            <div className="icon">
              <i className={`fa ${icon}`} />
            </div>
            <span className="time open-sans-font text-uppercase">{item.time}</span>
            <h5 className="poppins-font text-uppercase">
              {item.title} <span className="place open-sans-font">{item.place}</span>
            </h5>
            {item.bullets ? (
              <ul className="points open-sans-font">
                {item.bullets.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            ) : (
              <p className="open-sans-font">{item.description}</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
