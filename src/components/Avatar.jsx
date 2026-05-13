// Teams-style initials avatar. V2: replace with Graph profile photo.
const COLORS = ['#7B5BFF', '#4FC3F7', '#FF6B6B', '#FFB347', '#3FB984', '#E27ABE']

export default function Avatar({ name, size = 36 }) {
  const initials = (name || '?')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0].toUpperCase())
    .join('')
  const hash = [...(name || '')].reduce((a, c) => a + c.charCodeAt(0), 0)
  const bg = COLORS[hash % COLORS.length]
  return (
    <div
      className="avatar"
      style={{
        width: size,
        height: size,
        background: bg,
        fontSize: size * 0.4,
      }}
      aria-label={name}
    >
      {initials}
    </div>
  )
}
