import { useState } from 'react';

function LikeButton() {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };

  return (
    <div>
      <button onClick={handleLike}>
        {liked ? '❤️ Liked' : '🤍 Like'}
      </button>
      <p>{likeCount} likes</p>
    </div>
  );
}

export default LikeButton;