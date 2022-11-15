import React from 'react'
import '../css/Header.css'

function Header() {
  return (
    <ul className="navbar">
        <li className="nav-item">
          Metéo
          <div class="ping"></div>
        </li>
        <li className="nav-item">Alerte</li>
        <li className="nav-item">Carte</li>
        <li className="nav-item">Satelite</li>
        <li className="nav-item">Nouvelles</li>
    </ul>
  )
}

export default Header;