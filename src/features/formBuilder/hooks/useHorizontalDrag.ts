// src/hooks/useHorizontalDrag.ts
import { useEffect, useRef } from "react";

export default function useHorizontalDrag() {
  const ref = useRef<HTMLDivElement | null>(null);

  const isDragging = useRef(false);
  const isPointerDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const pointerId = useRef<number | null>(null);

  const DRAG_THRESHOLD = 5;

  // retorna true se o target (ou um ancestor) for elemento interativo
  const isInteractive = (el: Element | null) => {
    if (!el || !(el instanceof Element)) return false;
    return Boolean(
      (el as Element).closest(
        'button, a, input, textarea, select, [role="button"], [data-no-drag]'
      )
    );
  };

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.style.touchAction = "pan-y";
    el.classList.add("cursor-grab", "select-none");

    const onPointerDown = (e: PointerEvent) => {
      // se iniciou sobre um elemento interativo: não ativa drag
      if (isInteractive(e.target as Element)) {
        isPointerDown.current = false;
        return;
      }

      // botão direito (e.button !== 0) em mouse: ignora
      if (e.button && e.pointerType === "mouse") return;

      isPointerDown.current = true;
      isDragging.current = false;

      pointerId.current = e.pointerId;
      try {
        el.setPointerCapture(e.pointerId);
      } catch (err) {
        // ignore
      }

      startX.current = e.clientX;
      scrollLeft.current = el.scrollLeft;
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isPointerDown.current) return;

      const dx = e.clientX - startX.current;

      if (!isDragging.current && Math.abs(dx) > DRAG_THRESHOLD) {
        isDragging.current = true;
        el.classList.remove("cursor-grab");
        el.classList.add("cursor-grabbing");
      }

      if (isDragging.current) {
        e.preventDefault(); // evita seleção / clicks
        el.scrollLeft = scrollLeft.current - dx;
      }
    };

    const onPointerUp = () => {
      if (!isPointerDown.current && !isDragging.current) {
        // nothing started
        return;
      }

      isPointerDown.current = false;

      if (pointerId.current !== null) {
        try {
          el.releasePointerCapture(pointerId.current);
        } catch {}
      }
      pointerId.current = null;

      el.classList.remove("cursor-grabbing");
      el.classList.add("cursor-grab");

      // reset after frame — garante que clicks nativos sejam processados
      setTimeout(() => {
        isDragging.current = false;
      }, 0);
    };

    const onPointerCancel = () => {
      isPointerDown.current = false;
      isDragging.current = false;
      if (pointerId.current !== null) {
        try {
          el.releasePointerCapture(pointerId.current);
        } catch {}
      }
      pointerId.current = null;
      el.classList.remove("cursor-grabbing");
      el.classList.add("cursor-grab");
    };

    const onWheel = (e: WheelEvent) => {
      // se touchpad já faz deltaX, deixa o native passar
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;

      // roda vertical -> scroll horizontal
      el.scrollLeft += e.deltaY;

      const max = el.scrollWidth - el.clientWidth;
      if (el.scrollLeft > 0 && el.scrollLeft < max) e.preventDefault();
    };

    el.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove, { passive: false });
    window.addEventListener("pointerup", onPointerUp);
    el.addEventListener("pointercancel", onPointerCancel);
    el.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      el.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove as any);
      window.removeEventListener("pointerup", onPointerUp as any);
      el.removeEventListener("pointercancel", onPointerCancel);
      el.removeEventListener("wheel", onWheel as any);
      el.classList.remove("cursor-grab", "cursor-grabbing", "select-none");
      el.style.touchAction = "";
    };
  }, []);

  return ref;
}
