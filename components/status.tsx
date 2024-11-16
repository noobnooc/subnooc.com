"use client";

import { displayTimeAgo } from "@/helpers/date";
import { prettifyNumber } from "@/helpers/math";
import classNames from "classnames";
import { useEffect, useState } from "react";

export const revalidate = 5;

export function Status({ className }: { className?: string }) {
  const [status, setStatus] = useState({
    totalVisits: 0,
    onlineCount: 1,
    lastVisitor: {
      city: "Chengdu",
      country: "CN",
      flag: "🇨🇳",
    },
    timestamp: Date.now(),
  });

  useEffect(() => {
    fetch("/api/touch").then(async (resp) => {
      const result = (await resp.json()) as typeof status;

      setStatus(result);
    });
  }, []);

  return (
    <div className={classNames("text-sm self-start opacity-80", className)}>
      <div className="flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-4 h-4 mr-1"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.348 14.651a3.75 3.75 0 010-5.303m5.304 0a3.75 3.75 0 010 5.303m-7.425 2.122a6.75 6.75 0 010-9.546m9.546 0a6.75 6.75 0 010 9.546M5.106 18.894c-3.808-3.808-3.808-9.98 0-13.789m13.788 0c3.808 3.808 3.808 9.981 0 13.79M12 12h.008v.007H12V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
          />
        </svg>
        <div className={classNames("text-sm flex items-center")}>
          有 {status.onlineCount} 人正在浏览
          <span
            className={classNames(
              "rounded-full inline-block w-2 h-2 ml-2 bg-green-500"
            )}
          />
        </div>
      </div>
      <div className="flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-4 h-4 mr-1"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
          />
        </svg>
        上一位访客来自&nbsp;
        {status.lastVisitor.city ? `${status.lastVisitor.city}, ` : undefined}
        {status.lastVisitor.country}&nbsp;
        {status.lastVisitor.flag} 于 {displayTimeAgo(status.timestamp)}
      </div>
      <div className="flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-4 h-4 mr-1"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
          />
        </svg>
        共 {prettifyNumber(status.totalVisits)} 次访问
      </div>
    </div>
  );
}
