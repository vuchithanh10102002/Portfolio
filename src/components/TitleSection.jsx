/** Page heading with the oversized watermark word behind it. */
export default function TitleSection({ lead, highlight, watermark }) {
  return (
    <div className="title-section text-left text-sm-center">
      <h2>
        {lead} <span>{highlight}</span>
      </h2>
      <span className="title-bg">{watermark}</span>
    </div>
  )
}
