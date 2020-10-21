export const selectFields = ({ id, by, url, time, title} = {}) => ({    // if we pass something where one of these is undefined, it defaults to {}
  id,
  by,
  url,
  time,
  title
})