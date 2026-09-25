import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
  type RefObject
} from "react";
import { createPortal } from "react-dom";

type MenuPosition = {
  top: number;
  right: number;
  maxHeight: number;
};

type TopbarMenuPortalProps = {
  open: boolean;
  anchorRef: RefObject<HTMLElement | null>;
  onClose: () => void;
  children: ReactNode;
  className?: string;
  role?: string;
};

const GAP = 6;
const VIEWPORT_MARGIN = 8;

export function TopbarMenuPortal({
  open,
  anchorRef,
  onClose,
  children,
  className = "menu-panel",
  role = "menu"
}: TopbarMenuPortalProps) {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const [position, setPosition] = useState<MenuPosition | null>(null);

  const updatePosition = () => {
    const anchor = anchorRef.current;
    if (!anchor) return;

    const rect = anchor.getBoundingClientRect();
    const top = rect.bottom + GAP;
    const right = Math.max(VIEWPORT_MARGIN, window.innerWidth - rect.right);
    const maxHeight = Math.max(120, window.innerHeight - top - VIEWPORT_MARGIN);

    setPosition({ top, right, maxHeight });
  };

  useLayoutEffect(() => {
    if (!open) {
      setPosition(null);
      return;
    }

    updatePosition();

    const onViewportChange = () => updatePosition();
    window.addEventListener("resize", onViewportChange);
    window.addEventListener("scroll", onViewportChange, true);

    return () => {
      window.removeEventListener("resize", onViewportChange);
      window.removeEventListener("scroll", onViewportChange, true);
    };
  }, [open, anchorRef]);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: MouseEvent) => {
      const target = event.target as Node;
      if (anchorRef.current?.contains(target) || panelRef.current?.contains(target)) return;
      onClose();
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        anchorRef.current?.focus();
      }
    };

    window.addEventListener("mousedown", onPointerDown);
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("mousedown", onPointerDown);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, anchorRef, onClose]);

  if (!open || !position || typeof document === "undefined") return null;

  const style: CSSProperties = {
    top: position.top,
    right: position.right,
    maxHeight: position.maxHeight
  };

  return createPortal(
    <div ref={panelRef} className={`${className} menu-panel-portal`} role={role} style={style}>
      {children}
    </div>,
    document.body
  );
}
