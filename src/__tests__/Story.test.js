import React from 'react';
import  { Story } from '../components/Story';
import { singularStory } from '../fixtures';
import { getStory} from '../api/hackernewsAPI';

import { render, cleanup, waitForElement } from '@testing-library/react'

beforeEach(() => {
  cleanup();
  jest.resetAllMocks();
}) 

jest.mock('../api/hackernewsAPI', () => ({
  getStory: jest.fn(), 
}))

test('renders the story component with content', async ()=> {
  getStory.mockImplementation(() => Promise.resolve(singularStory))

  const { getByText, queryByTestId, getByTestId } = render(<Story storyId={1}/>);
  await waitForElement(() => [
    expect(getByText('Tarnished: Google Responds')).toBeTruthy(),
    expect(getByTestId('story')).toBeTruthy(),
    expect(queryByTestId('story-by').textContent).toEqual('By:  Willy Lee'),
  ]);
})