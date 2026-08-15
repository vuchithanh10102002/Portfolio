/**
 * One percentage dial. The rotation is inline so circle.css doesn't need the
 * template's 100 generated `.pNN` rule sets.
 */
export default function SkillCircle({ percent }) {
  return (
    <div className={`c100${percent > 50 ? ' gt50' : ''}`}>
      <span>{percent}%</span>
      <div className="slice">
        <div className="bar" style={{ transform: `rotate(${percent * 3.6}deg)` }} />
        <div className="fill" />
      </div>
    </div>
  )
}

