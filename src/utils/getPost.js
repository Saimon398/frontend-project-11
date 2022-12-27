/**
 * @description Returns filtered post
 * @param {Object []} posts
 * @param {Number} feedID
 * @param {Number} postID
 * @returns {Array []}
 */
export default (posts, target) => {
  const { feedid , postid } = target; // { 1, 2 }
  const [searched] = posts
    .filter(({ feedId }) => feedId === feedid)
    .flatMap(({ posts }) => posts)
    .filter(({ id }) => id === postid);
    
  return searched;
};
