import React from "react"
import { Link, NavLink } from "react-router-dom"
// components
import Btn from "./Btn"
import KikiStar from "./KikiStar"

const Nav = () => (
  <div className="Nav">
    <div><KikiStar /> KIKIMETAL</div>
    <ul>
      <li><NavLink exact to="/"><Btn>
        <i className="fas fa-bug" />Home</Btn></NavLink></li>
      <li><NavLink exact to="/about"><Btn>
        <i className="fas fa-bomb" />About</Btn></NavLink></li>
      <li><NavLink exact to="/products"><Btn>
        <i className="fas fa-bolt" />Products</Btn></NavLink></li>
    </ul>
  </div>
)

export default Nav
