import React from 'react'
import { Link } from 'react-router-dom'

const Links = ({ unlocks }) => (
  <div className="flex flex-column">
    <Link to="/">Bonfire</Link>
    {unlocks.includes('folks') && <Link to="/jobs">Village</Link>}
  </div>
)

export default Links
