import React from 'react';
import PropTypes from 'prop-types';
import './UserOnline.scss';

const UserOnline = ({ userInfo }) => {
  const renderUserOnlineInfo = () => {
    const userNow = Object.values(userInfo);

    const renderedUser = userNow.map((user) => {
      if (user.online) {
        return (
          <span key={user.id} className="UserOnline__online">
            {user.display_name}
          </span>
        );
      }
    })
      .filter(item => item !== undefined);

    return renderedUser.length ? renderedUser : false;
  };

  return (
    <div className="UserOnline">
      {renderUserOnlineInfo() || (<p className="UserOnline__empty">No users</p>)}
    </div>
  );
};

UserOnline.propTypes = {
  userInfo: PropTypes.instanceOf(Object).isRequired
};

export default UserOnline;
