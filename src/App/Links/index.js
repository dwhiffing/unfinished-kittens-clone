import { connect } from '../../storeContext'
import Links from './Links'

const mapStateToProps = ({ unlocks }) => ({ unlocks })

const mapDispatchToProps = dispatch => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Links)
