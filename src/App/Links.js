import { connect } from '../storeContext'
import React from 'react'
import { Link } from 'react-router-dom'

const mapStateToProps = ({ app: { unlocks } }) => ({ unlocks })

const mapDispatchToProps = dispatch => ({})

const Links = ({ unlocks }) => (
  <div className="flex flex-column">
    <Link to="/">Bonfire</Link>
    {unlocks.includes('folks') && <Link to="/jobs">Village</Link>}
  </div>
)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Links)
