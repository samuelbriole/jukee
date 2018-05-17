import React, { Component } from 'react';
import styled from 'styled-components';
import Player from './player';
import PlayerControls from './controls';

const BottomPlayerBarContainer1 = styled.div`
  position: fixed;
  width: 100%;
  bottom: 0;
  background-color: #282828;
`;

const BottomPlayerBarContainer2 = styled.footer`
  min-width: 620px;
  background-color: #282828;
  border-top: 1px solid #000;
  display: flex;
  flex-direction: column;
  height: auto;
  user-select: none;
`;

const BottomPlayerBarContainer3 = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 90px;
  padding: 0 16px;
`;

const PlayerBarLeft = styled.div`
  width: 30%;
  min-width: 180px;
`;

const PlayerBarMiddle = styled.div`
  width: 40%;
  max-width: 722px;
`;

const PlayerBarRight = styled.div`
  width: 30%;
  min-width: 180px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

class PlayerBar extends Component {
  render() {
    return (
      <BottomPlayerBarContainer1>
        <Player />
        <BottomPlayerBarContainer2>
          <BottomPlayerBarContainer3>
            <PlayerBarLeft />
            <PlayerBarMiddle>
              <PlayerControls />
            </PlayerBarMiddle>
            <PlayerBarRight />
          </BottomPlayerBarContainer3>
        </BottomPlayerBarContainer2>
      </BottomPlayerBarContainer1>
    );
  }
}

export default PlayerBar;