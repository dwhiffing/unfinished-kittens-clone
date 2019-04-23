import { connect } from '../storeContext'
import ScienceView from './ScienceView'

const mapStateToProps = ({ app: { unlocks }, resources, science }) => ({
  resources,
  science,
  unlocks,
})

const mapDispatchToProps = dispatch => ({
  buyScience: ({ name, prices }) =>
    dispatch({ type: 'BUY_SCIENCE', payload: { name, prices } }),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScienceView)
