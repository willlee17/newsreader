import React from 'react';
import { act } from 'react-dom/test-utils';
import  { StoriesContainer } from '../containers/StoriesContainer';
import { storyIds, singularStory } from '../fixtures';
import { getStory, getStoryIds} from '../api/hackernewsAPI';
import { useInfinteScroll } from '../hooks/useInfiniteScroll'
import {STORY_INCREMENTS } from '../constants'

import { render, cleanup, waitForElement } from '@testing-library/react'

beforeEach(cleanup)

jest.mock('../hooks/useInfiniteScroll')
jest.mock('../api/hackernewsAPI', () => ({
  getStory: jest.fn(),
  getStoryIds: jest.fn()
}))

test('renders stories container with a story', async () => {
  useInfinteScroll.mockImplementation(() => ({
    count: STORY_INCREMENTS
  }))

  getStory.mockImplementation(() => Promise.resolve(singularStory))
  getStoryIds.mockImplementation(() => Promise.resolve(storyIds))

  const { getByText, queryByTestId } = render(<StoriesContainer />)
  await waitForElement(() => ([
    expect(getByText('News Stories')).toBeTruthy(), 
    expect(getByText('Tarnished: Google Responds')).toBeTruthy(),
    expect(queryByTestId('story-by').textContent).toEqual('By:  Willy Lee')
  ]))

})