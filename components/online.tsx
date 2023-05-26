"use client";

import classNames from "classnames";
import { useCallback, useEffect, useState } from "react";

export function Online({ className }: { className?: string }) {
  const [online, setOnline] = useState(0);

  const updateOnline = useCallback(async () => {
    const response = await fetch("/api/online");

    const { devices } = await response.json();

    setOnline(devices);
  }, []);

  useEffect(() => {
    setInterval(updateOnline, 10000);

    updateOnline();
  });

  return (
    <div className={classNames("text-sm flex items-center", className)}>
      <span
        className={classNames("rounded-full inline-block w-2 h-2 mr-2", {
          "bg-gray-400": online === 0,
          "bg-green-500": online > 0,
        })}
      />
      {online} 人正在浏览
    </div>
  );
}
