import { connect } from '../storeContext'
import React from 'react'
import { Link } from 'react-router-dom'

const mapStateToProps = () => ({})

const mapDispatchToProps = dispatch => ({})

const Links = () => (
  <div className="flex flex-column">
    <Link to="/">Bonfire</Link>
    <Link
      to=""
      onClick={() => {
        const shouldReset = window.confirm('sure?')
        if (shouldReset) {
          localStorage.removeItem('save')
          localStorage.removeItem('unlocks')
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
