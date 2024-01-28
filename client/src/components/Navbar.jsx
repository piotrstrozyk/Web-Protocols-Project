import React from 'react'

const NavBar = () => {
  return (
    <nav classname="nav">
        <a href="/" className="site-site">Main Page</a>
        <ul>
            <li>
                <a href="/admin">Admin</a>
            </li>
        </ul>
    </nav>
  )
}

export default NavBar