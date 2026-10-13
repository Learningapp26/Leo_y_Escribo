// Marcianito provisional hecho con divs. Leo es siempre mint; los vecinos
// de cada planeta usan --alien. Se reemplazará por ilustración con esta API.
function Alien({ mood = 'normal', color, scale = 1, label = 'Leo', className = '' }) {
  return (
    <div className={`alien alien--${mood} ${className}`.trim()} role="img" aria-label={label}
      style={{ '--alien-scale': scale, ...(color ? { '--alien-color': color } : {}) }}>
      <span className="alien__antenna" />
      <span className="alien__body">
        <span className="alien__eye alien__eye--left" />
        <span className="alien__eye alien__eye--right" />
        <span className="alien__cheek alien__cheek--left" />
        <span className="alien__cheek alien__cheek--right" />
        <span className="alien__mouth" />
      </span>
    </div>
  )
}

export default Alien
