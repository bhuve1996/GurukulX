"use client";

import { useCallback, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ui } from "@/lib/config";

const PULL_THRESHOLD = 70;
const PULL_ZONE_TOP = 100;

type Props = { children: React.ReactNode };

export function PullToRefresh({ children }: Props) {
  const router = useRouter();
  const [pullDistance, setPullDistance] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const startY = useRef(0);
  const startX = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const pullDistanceRef = useRef(0);

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    startY.current = e.touches[0].clientY;
    startX.current = e.touches[0].clientX;
  }, []);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const touchY = e.touches[0].clientY;
    const touchX = e.touches[0].clientX;
    const deltaY = touchY - startY.current;
    const deltaX = touchX - startX.current;

    const startedInPullZone = startY.current - rect.top < PULL_ZONE_TOP;
    const isPullDown = deltaY > 0 && Math.abs(deltaY) >= Math.abs(deltaX);

    if (startedInPullZone && isPullDown) {
      const distance = Math.min(deltaY * 0.5, 80);
      pullDistanceRef.current = distance;
      setPullDistance(distance);
      if (distance > 10) {
        e.preventDefault();
      }
    }
  }, []);

  const onTouchEnd = useCallback(() => {
    const distance = pullDistanceRef.current;
    if (distance >= PULL_THRESHOLD) {
      setIsRefreshing(true);
      router.refresh();
      setTimeout(() => {
        setIsRefreshing(false);
        setPullDistance(0);
        pullDistanceRef.current = 0;
      }, 400);
    } else {
      setPullDistance(0);
      pullDistanceRef.current = 0;
    }
  }, [router]);

  return (
    <div
      ref={containerRef}
      className="relative flex h-full min-h-0 flex-1 flex-col overflow-hidden"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div
        className="absolute left-0 right-0 top-0 z-20 flex flex-shrink-0 items-center justify-center transition-transform duration-150"
        style={{
          transform: `translateY(${Math.max(0, pullDistance - 40)}px)`,
          opacity: pullDistance > 0 ? Math.min(1, pullDistance / 40) : 0,
        }}
      >
        <div className="flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 shadow-sm">
          {isRefreshing ? (
            <span className="text-sm font-medium text-neutral-600">{ui.pullToRefresh.refreshing}</span>
          ) : (
            <>
              <svg
                className="h-5 w-5 flex-shrink-0 text-neutral-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              <span className="text-sm font-medium text-neutral-600">
                {pullDistance >= PULL_THRESHOLD ? ui.pullToRefresh.release : ui.pullToRefresh.pull}
              </span>
            </>
          )}
        </div>
      </div>
      <div className="flex min-h-0 flex-1 flex-col">{children}</div>
    </div>
  );
}
