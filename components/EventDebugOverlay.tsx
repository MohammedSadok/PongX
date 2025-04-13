"use client";

import { useState, useEffect } from "react";

export function EventDebugOverlay() {
  const [events, setEvents] = useState<
    { type: string; x: number; y: number; time: number }[]
  >([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isVisible) return;

    const handleEvent = (e: MouseEvent | TouchEvent) => {
      const type = e.type;
      let clientX, clientY;

      if ("touches" in e && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else if ("clientX" in e) {
        clientX = e.clientX;
        clientY = e.clientY;
      } else {
        return;
      }

      setEvents((prev) => [
        { type, x: clientX, y: clientY, time: Date.now() },
        ...prev.slice(0, 9), // Keep only last 10 events
      ]);
    };

    const eventTypes = [
      "mousedown",
      "mousemove",
      "mouseup",
      "touchstart",
      "touchmove",
      "touchend",
    ];
    eventTypes.forEach((type) => {
      window.addEventListener(type, handleEvent as any);
    });

    return () => {
      eventTypes.forEach((type) => {
        window.removeEventListener(type, handleEvent as any);
      });
    };
  }, [isVisible]);

  if (!isVisible) {
    return (
      <button
        className="fixed top-4 left-4 bg-blue-500 text-white px-2 py-1 rounded z-100 opacity-50 hover:opacity-100"
        onClick={() => setIsVisible(true)}
      >
        Debug Events
      </button>
    );
  }

  return (
    <div className="fixed top-4 left-4 bg-black bg-opacity-80 p-3 rounded z-100 text-xs text-white w-64 max-h-64 overflow-auto">
      <div className="flex justify-between mb-2">
        <h3 className="font-bold">Event Debug</h3>
        <button onClick={() => setIsVisible(false)}>Close</button>
      </div>

      <ul>
        {events.map((event, i) => (
          <li key={i} className="mb-1">
            <span className="font-mono">{event.type}</span> at
            <span className="font-mono">
              {" "}
              ({event.x}, {event.y})
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
