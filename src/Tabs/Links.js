import { connect } from '../storeContext'
import React from 'react'
import { Link } from 'react-router-dom'

const mapStateToProps = ({ unlocks }) => ({ unlocks })

const mapDispatchToProps = dispatch => ({})

const Links = ({ unlocks }) => (
  <div className="flex flex-column">
    <Link to="/">Bonfire</Link>

    {unlocks.find(unlock => unlock.name === 'farm') && (
      <Link to="/farm">Farm</Link>
    )}
    {unlocks.find(unlock => unlock.name === 'forestry') && (
      <Link to="/forestry">Forestry</Link>
    )}
    <Link
      to=""
      onClick={() => {
        const shouldReset = window.confirm('sure?')
        if (shouldReset) {
          localStorage.removeItem('save')
          document.location.reload()
        }
      }}>
      Reset
    </Link>
  </div>
)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Links)
