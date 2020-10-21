import axios from 'axios';

import { getStoryIds, getStory, newStoriesURL, storyURL } from '../api/hackernewsAPI';
import { singularStory, emptySingularStory, storyIds } from '../fixtures/'
import { cleanup } from '@testing-library/react';

jest.mock('axios')

describe('HackerNews API', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  })

  describe('getStory Functionality', () => {
    it('requests and gets a story from HN API', async () => {
      axios.get.mockImplementation(() => 
        Promise.resolve({ data: { ...singularStory } })
      )

      const entity = await getStory(1);
      expect(axios.get).toHaveBeenCalledTimes(1)
      expect(axios.get).toHaveBeenCalledWith(`${storyURL + 1}.json`)
      expect(entity).toEqual(singularStory)
    })

    it('doesnt retrieve a story from API but handles it gracefully', async () => {
      axios.get.mockImplementation(() => 
        Promise.resolve({ data: { ...emptySingularStory } })
      )

      const entity = await getStory(1);
      expect(axios.get).toHaveBeenCalledTimes(1)
      expect(axios.get).toHaveBeenCalledWith(`${storyURL + 1}.json`)
      expect(entity).toEqual(emptySingularStory)
    })
  })

  describe('getStoryIds functionality', () => {
    it('requests and gets a list of storyIds from HN API', async () => {
      axios.get.mockImplementation(() => 
        Promise.resolve({ data: storyIds })
      )

      const entity = await getStoryIds();
      expect(axios.get).toHaveBeenCalledTimes(1)
      expect(axios.get).toHaveBeenCalledWith(newStoriesURL)
      expect(entity).toEqual(storyIds)
    })
  })
})