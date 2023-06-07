"use client";

import classNames from "classnames";
import { useCallback, useEffect, useState } from "react";

export const revalidate = 5;

export function Online({ className }: { className?: string }) {
  const [online, setOnline] = useState(1);

  const updateOnline = useCallback(async () => {
    const response = await fetch("/api/online", {
      next: { revalidate: revalidate },
    });

    const { devices } = await response.json();

    setOnline(devices);
  }, []);

  useEffect(() => {
    const timer = setInterval(updateOnline, 10000);

    updateOnline();

    return () => {
      clearInterval(timer);
    };
  }, [updateOnline]);

  return (
    <div className={classNames("text-sm flex items-center", className)}>
      有 {Math.max(online, 1)} 人正在浏览
      <span
        className={classNames(
          "rounded-full inline-block w-2 h-2 ml-2 bg-green-500"
        )}
      />
    </div>
  );
}
