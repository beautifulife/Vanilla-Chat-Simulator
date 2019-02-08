import React from 'react';
import PropTypes from 'prop-types';
import './Simulator.scss';
import UserOnline from './UserOnline';
import Chat from './Chat';

const Simulator = ({ initSimulator, timeLineData, userInfo }) => {
  const handleButtonClick = (ev) => {
    initSimulator();
  };

  return (
    <div className="Simulator">
      <div className="Simulator__header">vanilla_coding</div>
      <UserOnline userInfo={userInfo} />
      <Chat timeLineData={timeLineData} userInfo={userInfo} />
      <div className="Simulator__input">
        <input
          type="button"
          value="This is just a simulator"
          onClick={handleButtonClick}
        />
      </div>
    </div>
  );
};

Simulator.propTypes = {
  timeLineData: PropTypes.instanceOf(Array).isRequired,
  userInfo: PropTypes.instanceOf(Object).isRequired,
  initSimulator: PropTypes.func.isRequired
};

export default Simulator;
