import { connect } from 'react-redux';
import Simulator from '../components/Simulator';

// {
//   addMessage: (text, display_name, id, user_name) => dispatch(addMessage(text, display_name, id, user_name)),
//   deleteMessage: id => dispatch(deleteMessage(id)),
//   connectUser: (display_name, id, user_name) => dispatch(connectUser(display_name, id, user_name)),
//   disConnectUser: (display_name, id, user_name) => dispatch(disConnectUser(display_name, id, user_name)),
//   updateUser: (display_name, id, user_name) => dispatch(updateUser(display_name, id, user_name))
// }

const mapStateToProps = state => ({
  timeLineData: state
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
