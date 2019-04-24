import React from 'react'
import { connect } from '../storeContext'
import { Link } from 'react-router-dom'
import { getUnlockedTabs } from './selectors'

const mapStateToProps = state => ({
  tabs: getUnlockedTabs(state),
})

const mapDispatchToProps = dispatch => ({})

// TODO Labels should change based on level of related resources
const TabList = ({ tabs }) => (
  <div className="flex flex-column">
    {tabs.map(tab => (
      <Link key={`link-${tab.name}`} to={`/${tab.url}`}>
        {tab.name}
      </Link>
    ))}
    <Link
      to=""
      onClick={() => {
        const shouldReset = window.confirm('sure?')

        if (shouldReset) {
          localStorage.removeItem('save')
          document.location.reload()
        }
      }}>
      reset
    </Link>
  </div>
)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TabList)
