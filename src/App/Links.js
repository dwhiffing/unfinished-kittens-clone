import { connect } from '../storeContext'
import React from 'react'
import { Link } from 'react-router-dom'

const mapStateToProps = () => ({})

const mapDispatchToProps = dispatch => ({})

const Links = () => (
  <div className="flex flex-column">
    <Link to="/">Bonfire</Link>
  </div>
)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Links)
