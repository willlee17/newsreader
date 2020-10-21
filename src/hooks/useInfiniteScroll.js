import React, { useState, useEffect } from 'react';
import { STORY_INCREMENTS, MAX_STORIES } from '../constants/';
import { debounce } from '../utils/debounce';

export const useInfinteScroll = () => {
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(STORY_INCREMENTS)

  const handleScroll = debounce(() => {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || !!loading ) {
      return;
    }

    setLoading(true)
  }, 300)

  useEffect(() => {
    if (!loading) return;

    if (count + STORY_INCREMENTS >= MAX_STORIES) {
      setCount(MAX_STORIES)
    } else {
      setCount(count + STORY_INCREMENTS)
    }

    setLoading(false)
  }, [ loading])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return { count }
}