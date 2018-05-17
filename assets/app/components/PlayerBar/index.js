import React, { Component } from 'react';
import styled from 'styled-components';
import Player from './player';

const BottomPlayerBar = styled.div`
  position: fixed;
  bottom: 0;
  height: 90px;
  width: 100%;
  background-color: #282828;
`;

class PlayerBar extends Component {
  render() {
    return (
      <BottomPlayerBar><Player /></BottomPlayerBar>
    );
  }
}


export default PlayerBar;
