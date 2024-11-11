import React from 'react'
import { Menubar } from 'primereact/menubar'
import { NavLink } from 'react-router-dom'
import 'primereact/resources/themes/saga-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import './Navbar.css'

export const Navbar = () => {
  const items = [
    {
      label: 'BAZAAR BUY & SELL',
      icon: 'pi pi-fw pi-home',
      command: () => { window.location.href = "/" }
    },
    {
      label: '',
      icon: 'pi pi-fw pi-shopping-cart',
      command: () => { window.location.href = "/purchases" }
    }
  ]

  return (
    <div className="navbar">
      <Menubar model={items} />
    </div>
  )
}