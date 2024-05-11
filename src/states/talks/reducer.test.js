import { describe, expect, it } from 'vitest';
import talksReducer from './reducer';

/**
* test scenario for talksReducer
*
* - talkReducers function
*  - should return the initial state when given by unknown action
*  - should return the talks when given by RECEIVE_TALKS action
*  - should return the talks with the new talk when given by ADD_TALK action
*  - should return the talks with the toggled like talk when given by TOGGLE_LIKE_TALK action
*
*/

describe('talksReducer function', () => {
  it('should return the initial state when given by unknown action', () => {
    // arrange => untuk kebutuhan sebuah testing
    const initState = [];
    const action = { type: 'UNKNOWN' };

    // action => aksi dari unit yang di testing
    const nextState = talksReducer(initState, action);

    // assert => untuk memeriksa efek atau hasil dari action yang di testing
    expect(nextState).toEqual(initState);
  });

  it('should return the talks when given by RECEIVE_TALKS action', () => {
    // arrange
    const initState = [];
    const action = {
      type: 'RECEIVE_TALKS',
      payload: {
        talks: [
          {
            id: 'talk-1',
            text: 'Talk Test 1',
            user: 'user-1',
            replyTo: '',
            likes: [],
            createdAt: '2022-09-22T10:06:55.588Z',
          },
          {
            id: 'talk-2',
            text: 'Talk Test 2',
            user: 'user-2',
            replyTo: '',
            likes: [],
            createdAt: '2022-09-22T10:06:55.588Z',
          },
        ],
      },
    };
    // action
    const nextState = talksReducer(initState, action);
    // assert
    expect(nextState).toEqual(action.payload.talks);
  });
});

it('should return the talks with the new talk when given by ADD_TALK action', () => {
  // arrange
  const initState = [
    {
      id: 'talk-1',
      text: 'Talk Test 1',
      user: 'user-1',
      replyTo: '',
      likes: [],
      createdAt: '2022-09-22T10:06:55.588Z',
    },
  ];

  const action = {
    type: 'ADD_TALK',
    payload: {
      talk: {
        id: 'talk-2',
        text: 'Talk Test 2',
        user: 'user-2',
        replyTo: '',
        likes: [],
        createdAt: '2022-09-22T10:06:55.588Z',
      },
    },
  };

  // action
  const nextState = talksReducer(initState, action);
  // assert
  expect(nextState).toEqual([action.payload.talk, ...initState]);
});

describe('talksReducer function', () => {
  it('should return the talks with the toggled like talk when given by TOGGLE_LIKE_TALK action', () => {
    const initState = [
      {
        id: 'talk-1',
        text: 'Talk Test 1',
        user: 'user-1',
        replyTo: '',
        likes: [],
        createdAt: '2022-09-22T10:06:55.588Z',
      },
    ];

    const action = {
      type: 'TOGGLE_LIKE_TALK',
      payload: {
        talkId: 'talk-1',
        userId: 'user-1',
      },
    };

    // action Like talk
    const nextState = talksReducer(initState, action);

    // assert
    expect(nextState).toEqual([
      {
        ...initState[0],
        likes: [action.payload.userId],
      },
    ]);

    // action Unlike talk
    const nextState2 = talksReducer(nextState, action);

    // assert
    expect(nextState2).toEqual(initState);
  });
});
