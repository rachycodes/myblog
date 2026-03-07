'use client';

import { useState, useTransition } from 'react';

type LikeButtonProps = {
  postId: string;
  initialLikes: number;
};

export function LikeButton({ postId, initialLikes }: LikeButtonProps) {
  const [likes, setLikes] = useState(initialLikes ?? 0);
  const [isPending, startTransition] = useTransition();

  function handleLike() {
    // optimistic UI
    setLikes((prev) => prev + 1);

    startTransition(async () => {
      try {
        const res = await fetch(`/api/like/${postId}`, {
          method: 'POST',
        });

        if (!res.ok) {
          console.error('Like failed with status', res.status);
          // roll back
          setLikes((prev) => prev - 1);
          return;
        }

        const data = await res.json().catch(() => null);
        if (data && typeof data.likes === 'number') {
          setLikes(data.likes);
        }
      } catch (err) {
        console.error('Like error', err);
        setLikes((prev) => prev - 1);
      }
    });
  }

  return (
    <button
      onClick={handleLike}
      disabled={isPending}
      className="mt-2 flex items-center gap-2 text-red-500 hover:scale-110 transition"
    >
      <span>❤️</span>
      <span>{likes}</span>
    </button>
  );
}
