import React, { useState, useEffect } from 'react';
import { getStoryIds } from '../api/hackernewsAPI';
import { Story } from '../components/Story';
import { GlobalStyle, StoriesContainerWrapper } from '../styles/StoryContainerStyles';
import { useInfinteScroll } from '../hooks/useInfiniteScroll'; 

export const StoriesContainer = () => {
  const [storyIds, setStoryIds] = useState([])
  const { count } = useInfinteScroll()

  useEffect(() => {
    getStoryIds().then(data => setStoryIds(data))
  }, [])

  return (
    <div>
      <GlobalStyle />
      <StoriesContainerWrapper data-testid='stories-container'>
        <h1>News Stories</h1>
        {storyIds.slice(0,count).map(storyId => <Story storyId={storyId} key={storyId}/>)}
      </StoriesContainerWrapper>
    </div>
  )
}
