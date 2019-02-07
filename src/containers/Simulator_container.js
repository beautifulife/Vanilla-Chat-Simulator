import { connect } from 'react-redux';
import Simulator from '../components/Simulator';

const mapStateToProps = state => ({
  timeLineData: state.messages,
  userInfo: state.usersById
});

const mapDispatchToProps = dispatch => ({
  initSimulator: () => {
    fetch('https://chat-simulator.firebaseio.com/chats.json')
      .then(res => res.json())
      .then((data) => {
        data.forEach((action) => {
          setTimeout(() => {
            dispatch(action.payload);
          }, action.delta);
        });
      })
      .catch(err => console.err(err));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Simulator);
