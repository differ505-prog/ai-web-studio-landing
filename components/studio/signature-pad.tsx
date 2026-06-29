"use client";

import { useEffect, useRef } from "react";

export function SignaturePad({
  onChange,
}: {
  onChange: (value: string) => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const drawingRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }

    context.lineWidth = 2.5;
    context.lineCap = "round";
    context.lineJoin = "round";
    context.strokeStyle = "#5c4a3f";
    context.fillStyle = "#fffdf9";
    context.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  function getPoint(event: React.PointerEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current;
    if (!canvas) {
      return { x: 0, y: 0 };
    }

    const rect = canvas.getBoundingClientRect();
    return {
      x: ((event.clientX - rect.left) / rect.width) * canvas.width,
      y: ((event.clientY - rect.top) / rect.height) * canvas.height,
    };
  }

  function handlePointerDown(event: React.PointerEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) {
      return;
    }

    const point = getPoint(event);
    drawingRef.current = true;
    canvas.setPointerCapture(event.pointerId);
    context.beginPath();
    context.moveTo(point.x, point.y);
  }

  function handlePointerMove(event: React.PointerEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context || !drawingRef.current) {
      return;
    }

    const point = getPoint(event);
    context.lineTo(point.x, point.y);
    context.stroke();
    onChange(canvas.toDataURL("image/png"));
  }

  function handlePointerUp(event: React.PointerEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    drawingRef.current = false;
    canvas.releasePointerCapture(event.pointerId);
    onChange(canvas.toDataURL("image/png"));
  }

  function clearCanvas() {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) {
      return;
    }

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "#fffdf9";
    context.fillRect(0, 0, canvas.width, canvas.height);
    onChange("");
  }

  return (
    <div className="rounded-[24px] border border-stone-200 bg-white p-4">
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm font-medium text-stone-700">請以手指或觸控筆完成簽名</p>
        <button
          type="button"
          onClick={clearCanvas}
          className="rounded-full border border-stone-300 px-4 py-2 text-sm font-semibold text-stone-700 transition hover:border-stone-500"
        >
          清除簽名
        </button>
      </div>
      <canvas
        ref={canvasRef}
        width={640}
        height={260}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={(event) => {
          if (drawingRef.current) {
            handlePointerUp(event);
          }
        }}
        className="mt-4 h-[220px] w-full rounded-[20px] border border-dashed border-stone-300 bg-[#fffdf9] touch-none"
      />
    </div>
  );
}
