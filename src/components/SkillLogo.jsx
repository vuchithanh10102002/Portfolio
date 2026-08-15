/**
 * One skill tile. Replaces the old percentage dial (<SkillCircle>) - the CV has
 * no self-rated percentages, so the logo carries the meaning instead.
 */
export default function SkillLogo({ src, name }) {
  return (
    <div className="skill-logo">
      <img src={src} alt={`${name} logo`} loading="lazy" />
    </div>
  )
}
