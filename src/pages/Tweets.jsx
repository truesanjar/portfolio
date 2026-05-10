import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { MessageCircle, Loader2 } from "lucide-react";
import { useApp } from "../contexts/AppContext";
import { PHOTO_URL } from "../data/profile";
import tweetsData from "../data/tweets.json";

const PAGE_SIZE = 10;

// ---------------------- вақт ----------------------
const formatTime = (iso, lang, t) => {
  try {
    const date = new Date(iso);
    const now = new Date();

    const diff = now - date;

    const minute = 60 * 1000;
    const hour = 60 * minute;
    const day = 24 * hour;
    const week = 7 * day;
    const month = 30 * day;
    const year = 365 * day;

    if (diff < minute) return t.tweets.now;

    if (diff < hour) {
      const m = Math.floor(diff / minute);
      return `${m} ${t.tweets.minutesAgo}`;
    }

    if (diff < day) {
      const h = Math.floor(diff / hour);
      return `${h} ${t.tweets.hoursAgo}`;
    }

    if (diff < week) {
      const d = Math.floor(diff / day);
      return `${d} ${t.tweets.daysAgo}`;
    }

    if (diff < month) {
      const w = Math.floor(diff / week);
      return `${w} ${t.tweets.weeksAgo}`;
    }

    if (diff < year) {
      const mo = Math.floor(diff / month);
      return `${mo} ${t.tweets.monthsAgo}`;
    }

    const y = Math.floor(diff / year);
    return `${y} ${t.tweets.yearsAgo}`;
  } catch {
    return "";
  }
};

// ---------------------- Tweet ----------------------
const Tweet = ({ tweet, lang, t }) => {
  return (
    <article className="tweet-card" data-testid={`tweet-${tweet.id}`}>
      <div className="flex gap-3">
        <img
          src={PHOTO_URL}
          alt="avatar"
          className="w-11 h-11 rounded-full object-cover object-top shrink-0 border border-border"
        />

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="font-bold text-sm">Санҷар</span>

            <span className="text-muted-foreground text-sm mono">
              @truesanjar
            </span>

            <span className="text-muted-foreground">·</span>

            <span className="text-muted-foreground text-sm">
              {formatTime(tweet.created_at, lang, t)}
            </span>
          </div>

          <div className="text-xs text-muted-foreground mt-1">
            {new Date(tweet.created_at).toLocaleDateString(
              lang === "tj"
                ? "ru-RU"
                : lang === "ru"
                ? "ru-RU"
                : "en-US",
              {
                year: "numeric",
                month: "long",
                day: "numeric",
              }
            )}
          </div>

          <p className="text-[15px] leading-[1.5] mt-3 whitespace-pre-wrap break-words">
            {tweet.text}
          </p>

          {tweet.image && (
            <div className="mt-3 rounded-xl overflow-hidden border border-border">
              <img
                src={`/tweets_images/${tweet.image}`}
                alt=""
                className="w-full"
              />
            </div>
          )}
        </div>
      </div>
    </article>
  );
};

// ---------------------- Page ----------------------
const TweetsPage = () => {
  const { t, lang } = useApp();
  const tw = t.tweets;

  const [tweets, setTweets] = useState([]);
  const [skip, setSkip] = useState(0);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const sentinelRef = useRef(null);

  // ✅ SORT: навҳо боло
  const sortedTweets = useMemo(() => {
    return [...tweetsData].sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at)
    );
  }, []);

  const loadPage = useCallback(() => {
    if (loading || done) return;

    setLoading(true);

    setTimeout(() => {
      const slice = sortedTweets.slice(skip, skip + PAGE_SIZE);

      if (slice.length === 0) {
        setDone(true);
        setLoading(false);
        return;
      }

      setTweets((prev) => {
        const seen = new Set(prev.map((t) => t.id));
        const uniq = slice.filter((t) => !seen.has(t.id));
        return [...prev, ...uniq];
      });

      setSkip((prev) => prev + slice.length);

      if (slice.length < PAGE_SIZE) {
        setDone(true);
      }

      setLoading(false);
    }, 200);
  }, [skip, loading, done, sortedTweets]);

  useEffect(() => {
    loadPage();
  }, []);

  useEffect(() => {
    if (done) return;

    const el = sentinelRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          loadPage();
        }
      },
      { rootMargin: "300px" }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [loadPage, done]);

  return (
    <div className="page-shell fade-up" data-testid="tweets-page">
      <span className="section-eyebrow">{tw.eyebrow}</span>

      <h1 className="section-title flex items-center gap-3">
        {tw.title}
        <MessageCircle className="w-7 h-7 text-accent" strokeWidth={2.2} />
      </h1>

      <p className="text-muted-foreground text-base md:text-lg max-w-xl mb-8">
        {tw.subtitle}
      </p>

      <div className="space-y-3">
        {tweets.length === 0 && !loading && (
          <div className="text-center py-12 text-muted-foreground">
            {tw.empty}
          </div>
        )}

        {tweets.map((tweet) => (
          <Tweet key={tweet.id} tweet={tweet} lang={lang} t={t} />
        ))}
      </div>

      <div
        ref={sentinelRef}
        className="py-8 flex flex-col items-center justify-center gap-3"
      >
        {loading && (
          <span className="flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="w-4 h-4 animate-spin" />
            {tw.loading}
          </span>
        )}

        {!loading && !done && tweets.length > 0 && (
          <button
            onClick={loadPage}
            className="px-5 py-2.5 rounded-full bg-secondary hover:bg-accent hover:text-accent-foreground text-sm font-medium border border-border transition-all"
          >
            {tw.more}
          </button>
        )}

        {done && !loading && tweets.length > 0 && (
          <span className="text-xs mono text-muted-foreground">
            {tw.end}
          </span>
        )}
      </div>
    </div>
  );
};

export default TweetsPage;