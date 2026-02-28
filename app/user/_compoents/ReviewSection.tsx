"use client";
import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/context/AuthContext";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ReviewUser {
  id: string;
  fullname: string;
}

interface Review {
  id: string;
  rating: number;
  comment?: string;
  createdAt: string;
  isOwn: boolean;
  user: ReviewUser;
}

interface ReviewsResponse {
  success: boolean;
  data: {
    averageRating: number;
    totalReviews: number;
    reviews: Review[];
  };
}

interface ReviewSectionProps {
  movieId: string;
}

// ─── Utility Functions ────────────────────────────────────────────────────────

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 30) return `${days}d ago`;
  return new Date(dateStr).toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

const RATING_LABELS: Record<number, string> = {
  1: "Poor",
  2: "Fair",
  3: "Good",
  4: "Great",
  5: "Excellent",
};

// ─── Star Rating ──────────────────────────────────────────────────────────────

function StarRating({
  value,
  interactive = false,
  hover = 0,
  onHover,
  onClick,
  size = "md",
}: {
  value: number;
  interactive?: boolean;
  hover?: number;
  onHover?: (v: number) => void;
  onClick?: (v: number) => void;
  size?: "sm" | "md" | "lg";
}) {
  const sz = size === "sm" ? "w-3.5 h-3.5" : size === "lg" ? "w-7 h-7" : "w-5 h-5";
  const active = hover || value;

  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={!interactive}
          onMouseEnter={() => onHover?.(star)}
          onMouseLeave={() => onHover?.(0)}
          onClick={() => onClick?.(star)}
          className={interactive ? "cursor-pointer transition-transform hover:scale-110 active:scale-95" : "cursor-default"}
        >
          <svg
            className={`${sz} transition-colors duration-100 ${
              star <= active ? "text-amber-400" : "text-slate-700"
            }`}
            viewBox="0 0 24 24"
            fill={star <= active ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
            />
          </svg>
        </button>
      ))}
    </div>
  );
}

// ─── Rating Summary Bar ───────────────────────────────────────────────────────

function RatingSummary({ avg, total, reviews }: { avg: number; total: number; reviews: Review[] }) {
  const counts = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => r.rating === star).length,
  }));

  return (
    <div className="flex flex-col sm:flex-row gap-6 p-5 bg-slate-900/70 rounded-2xl border border-slate-800">
      {/* Average */}
      <div className="flex flex-col items-center justify-center min-w-[96px] gap-1">
        <span className="text-5xl font-bold text-white tabular-nums">{avg.toFixed(1)}</span>
        <StarRating value={Math.round(avg)} size="sm" />
        <span className="text-xs text-slate-500 mt-0.5">
          {total} review{total !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Breakdown */}
      <div className="flex flex-col justify-center gap-1.5 flex-1 min-w-0">
        {counts.map(({ star, count }) => {
          const pct = total > 0 ? (count / total) * 100 : 0;
          return (
            <div key={star} className="flex items-center gap-2 text-xs">
              <span className="text-slate-400 w-2 shrink-0">{star}</span>
              <svg className="w-3 h-3 text-amber-400 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
              </svg>
              <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-400 rounded-full transition-all duration-700"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <span className="text-slate-500 w-4 text-right shrink-0">{count}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Review Form ──────────────────────────────────────────────────────────────

function ReviewForm({
  movieId,
  existingReview,
  onSaved,
  onDeleted,
}: {
  movieId: string;
  existingReview: Review | null;
  onSaved: (r: Review) => void;
  onDeleted: () => void;
}) {
  const [rating, setRating] = useState(existingReview?.rating ?? 0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState(existingReview?.comment ?? "");
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const isEdit = !!existingReview;
  const hasChanges =
    rating !== (existingReview?.rating ?? 0) ||
    comment !== (existingReview?.comment ?? "");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (rating === 0) { setError("Please select a rating."); return; }
    setError(null);
    setSubmitting(true);

    try {
      const res = await fetch(`/api/reviews/${movieId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rating, comment: comment.trim() || undefined }),
      });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.message || "Failed to save review.");

      // Shape the returned data to match our Review interface
      const saved = json.data;
      onSaved({
        id: saved._id || saved.id,
        rating: saved.rating,
        comment: saved.comment,
        createdAt: saved.createdAt,
        isOwn: true,
        user: {
          id: saved.user?._id || saved.user?.id || "",
          fullname: saved.user?.fullname || "You",
        },
      });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete() {
    setDeleting(true);
    setError(null);
    try {
      const res = await fetch(`/api/reviews/${movieId}`, { method: "DELETE" });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.message || "Failed to delete review.");
      onDeleted();
    } catch (err: any) {
      setError(err.message);
      setDeleting(false);
      setConfirmDelete(false);
    }
  }

  const displayHover = hover || rating;

  return (
    <form onSubmit={handleSubmit} className="p-5 bg-slate-900/70 rounded-2xl border border-slate-800 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-white">
          {isEdit ? "Your Review" : "Write a Review"}
        </h3>
        {isEdit && (
          <span className="text-xs text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded-full">
            Editing
          </span>
        )}
      </div>

      {/* Star picker */}
      <div className="flex items-center gap-3">
        <StarRating
          value={rating}
          interactive
          hover={hover}
          onHover={setHover}
          onClick={setRating}
          size="lg"
        />
        {displayHover > 0 && (
          <span className="text-sm text-amber-400 font-medium transition-all">
            {RATING_LABELS[displayHover]}
          </span>
        )}
      </div>

      {/* Comment */}
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        maxLength={1000}
        rows={3}
        placeholder="Share your thoughts... (optional)"
        className="w-full bg-slate-800/60 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 resize-none focus:outline-none focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/30 transition"
      />
      <div className="flex justify-end">
        <span className="text-xs text-slate-600">{comment.length}/1000</span>
      </div>

      {/* Error */}
      {error && (
        <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 px-3 py-2 rounded-lg">
          {error}
        </p>
      )}

      {/* Actions */}
      <div className="flex items-center gap-3 justify-between">
        {isEdit ? (
          confirmDelete ? (
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Sure?</span>
              <button
                type="button"
                onClick={handleDelete}
                disabled={deleting}
                className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs rounded-lg transition disabled:opacity-50"
              >
                {deleting ? "Deleting..." : "Yes, Delete"}
              </button>
              <button
                type="button"
                onClick={() => setConfirmDelete(false)}
                className="px-3 py-1.5 text-slate-400 hover:text-white text-xs rounded-lg transition"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setConfirmDelete(true)}
              className="flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300 transition"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Delete review
            </button>
          )
        ) : (
          <span /> // spacer
        )}

        <button
          type="submit"
          disabled={submitting || rating === 0 || (isEdit && !hasChanges)}
          className="flex items-center gap-2 px-5 py-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-medium rounded-xl transition"
        >
          {submitting ? (
            <>
              <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Saving...
            </>
          ) : isEdit ? (
            "Update Review"
          ) : (
            "Submit Review"
          )}
        </button>
      </div>
    </form>
  );
}

// ─── Single Review Card ───────────────────────────────────────────────────────

function ReviewCard({ review }: { review: Review }) {
  const initials = review.user.fullname
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className={`p-4 rounded-xl border transition-all ${
      review.isOwn
        ? "bg-blue-950/30 border-blue-700/30"
        : "bg-slate-900/50 border-slate-800"
    }`}>
      <div className="flex items-start gap-3">
        {/* Avatar */}
        <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
          review.isOwn
            ? "bg-blue-600/30 border border-blue-500/40 text-blue-300"
            : "bg-slate-800 border border-slate-700 text-slate-300"
        }`}>
          {initials}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-medium text-white truncate">
              {review.user.fullname}
            </span>
            {review.isOwn && (
              <span className="text-xs text-blue-400 bg-blue-500/10 border border-blue-500/20 px-1.5 py-0.5 rounded-full leading-none">
                You
              </span>
            )}
            <span className="text-xs text-slate-600 ml-auto shrink-0">
              {timeAgo(review.createdAt)}
            </span>
          </div>

          <div className="flex items-center gap-2 mt-1">
            <StarRating value={review.rating} size="sm" />
            <span className="text-xs text-amber-400/80">{RATING_LABELS[review.rating]}</span>
          </div>

          {review.comment && (
            <p className="text-sm text-slate-400 leading-relaxed mt-2">{review.comment}</p>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────


export default function ReviewSection({ movieId }: ReviewSectionProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [avgRating, setAvgRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const ownReview = reviews.find((r) => r.isOwn) ?? null;



  const fetchReviews = useCallback(async () => {
    if (!movieId) {
      setFetchError("No movie ID provided.");
      setLoading(false);
      return;
    }
    setLoading(true);
    setFetchError(null);
    try {
      const res = await fetch(`/api/reviews/${movieId}`);
      const json: ReviewsResponse = await res.json();
      if (!res.ok || !json.success) throw new Error((json.data as any) || "Failed to load reviews");
      setReviews(json.data.reviews);
      setAvgRating(json.data.averageRating);
      setTotalReviews(json.data.totalReviews);
    } catch (err: any) {
      setFetchError(err.message);
    } finally {
      setLoading(false);
    }
  }, [movieId]);

  const { isAuthenticated } = useAuth();

  useEffect(() => {
    setIsLoggedIn(isAuthenticated);
    fetchReviews();
  }, [fetchReviews, isAuthenticated]);

  function handleSaved(saved: Review) {
    setReviews((prev) => {
      const without = prev.filter((r) => !r.isOwn);
      return [saved, ...without];
    });
    setTotalReviews((t) => (ownReview ? t : t + 1));
    // Recalculate avg
    const updated = reviews.filter((r) => !r.isOwn);
    const all = [saved, ...updated];
    const newAvg = all.reduce((s, r) => s + r.rating, 0) / all.length;
    setAvgRating(parseFloat(newAvg.toFixed(1)));
  }

  function handleDeleted() {
    setReviews((prev) => prev.filter((r) => !r.isOwn));
    const remaining = reviews.filter((r) => !r.isOwn);
    setTotalReviews(remaining.length);
    const newAvg = remaining.length
      ? remaining.reduce((s, r) => s + r.rating, 0) / remaining.length
      : 0;
    setAvgRating(parseFloat(newAvg.toFixed(1)));
  }

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <h2 className="text-lg font-semibold text-white">Reviews</h2>
        {totalReviews > 0 && (
          <span className="text-xs text-slate-500 bg-slate-800 px-2 py-0.5 rounded-full border border-slate-700">
            {totalReviews}
          </span>
        )}
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
            <span className="text-sm text-slate-500">Loading reviews...</span>
          </div>
        </div>
      )}

      {/* Fetch error */}
      {fetchError && !loading && (
        <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-sm text-red-400">
          <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {fetchError}
          <button onClick={fetchReviews} className="ml-auto underline hover:no-underline">Retry</button>
        </div>
      )}

      {!loading && !fetchError && (
        <>
          {/* Rating summary */}
          {totalReviews > 0 && (
            <RatingSummary avg={avgRating} total={totalReviews} reviews={reviews} />
          )}

          {/* Write / edit form */}
          {isLoggedIn ? (
            <ReviewForm
              movieId={movieId}
              existingReview={ownReview}
              onSaved={handleSaved}
              onDeleted={handleDeleted}
            />
          ) : (
            <div className="flex items-center gap-3 p-4 bg-slate-900/60 border border-slate-800 rounded-xl text-sm text-slate-400">
              <svg className="w-4 h-4 shrink-0 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Sign in to leave a review.
            </div>
          )}

          {/* Reviews list */}
          {reviews.length > 0 ? (
            <div className="space-y-3">
              {reviews.map((r) => (
                <ReviewCard key={r.id} review={r} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 py-10 text-center">
              <svg className="w-10 h-10 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <p className="text-slate-500 text-sm">No reviews yet. Be the first!</p>
            </div>
          )}
        </>
      )}
    </section>
  );
}