import { Presence } from 'phoenix';
import { types as playerTypes, playerEvents, disconnectPlayerRoutine } from 'actions/player';
import isMobile from 'utils/isMobile';

const initialState = {
  presences: {},
  player: {},
  playback: !isMobile(),
};

const playerEventReducer = (state = initialState, action) => {
  switch (action.eventName) {
    case playerEvents.playerUpdate:
      return {
        ...state,
        player: {
          ...state.player,
          ...action.payload,
        },
      };
    case playerEvents.presenceState:
      return {
        ...state,
        presences: Presence.syncState(state.presences, action.payload),
      };
    case playerEvents.presenceDiff:
      return {
        ...state,
        presences: Presence.syncDiff(state.presences, action.payload),
      };
    default:
      return state;
  }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case playerTypes.INITIALIZE_PLAYER:
      return {
        ...state,
        player: action.player,
      };
    case disconnectPlayerRoutine.SUCCESS:
      return initialState;
    case playerTypes.PLAYER_EVENT:
      return playerEventReducer(state, action);
    case playerTypes.SET_PLAYBACK:
      return { ...state, playback: action.playback };
    default:
      return state;
  }
}
