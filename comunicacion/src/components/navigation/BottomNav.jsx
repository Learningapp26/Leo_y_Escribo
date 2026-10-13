import { NavLink } from 'react-router-dom'
import { Home, Orbit, BarChart3, Stamp } from 'lucide-react'

const defaultItems = [
  {
    label: 'Inicio',
    to: '/home',
    icon: Home,
  },
  {
    label: 'Mi galaxia',
    to: '/lecciones',
    icon: Orbit,
  },
  {
    label: 'Sellos',
    to: '/sellos',
    icon: Stamp,
  },
  {
    label: 'Mi progreso',
    to: '/progreso',
    icon: BarChart3,
  },
]

function BottomNav({ items = defaultItems }) {
  return (
    <nav className="bottom-nav" aria-label="Navegación principal">
      {items.map((item) => {
        const Icon = item.icon

        return (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              [
                'bottom-nav__item',
                isActive ? 'bottom-nav__item--active' : '',
              ]
                .filter(Boolean)
                .join(' ')
            }
          >
            <Icon className="bottom-nav__icon" aria-hidden="true" />
            <span className="bottom-nav__label">{item.label}</span>
          </NavLink>
        )
      })}
    </nav>
  )
}

export default BottomNav