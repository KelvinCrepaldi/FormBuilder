import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { AlignLeft, ListChecks, Menu, Plus, Rows3 } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router";

type Builder2BlockType = "text" | "options" | "button";

type Builder2Block = {
  id: string;
  type: Builder2BlockType;
  x: number;
  y: number;
  children: {
    id: string;
    label: string;
  }[];
};

type Builder2Connection = {
  id: string;
  fromId: string;
  toId: string;
};

type LinkingState = {
  fromEndpointId: string;
  pointerX: number;
  pointerY: number;
};

type PanState = {
  startX: number;
  startY: number;
  pointerX: number;
  pointerY: number;
};

const navItems = [
  { title: "Workspace", to: "/dashboard", icon: "folder_open" },
  { title: "Projetos", to: "/dashboard/projects", icon: "edit_note" },
  { title: "Builder", to: "/builder", icon: "rocket_launch" },
  { title: "Builder2", to: "/builder2", icon: "deployed_code" },
] as const;

const blockFactory: Record<
  Builder2BlockType,
  { label: string; icon: typeof AlignLeft }
> = {
  text: { label: "Texto", icon: AlignLeft },
  options: { label: "Opções", icon: ListChecks },
  button: { label: "Botão", icon: Rows3 },
};

export default function Builder2Page() {
  const canvasRef = useRef<HTMLDivElement | null>(null);
  const outputRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const inputRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [blocks, setBlocks] = useState<Builder2Block[]>([]);
  const [connections, setConnections] = useState<Builder2Connection[]>([]);
  const [dragging, setDragging] = useState<{
    id: string;
    startX: number;
    startY: number;
    pointerX: number;
    pointerY: number;
  } | null>(null);
  const [linking, setLinking] = useState<LinkingState | null>(null);
  const [hoveredInputId, setHoveredInputId] = useState<string | null>(null);
  const [panning, setPanning] = useState<PanState | null>(null);

  const centerLabel = useMemo(() => "0,0", []);

  useEffect(() => {
    const element = canvasRef.current;
    if (!element) {
      return;
    }

    const updateSize = () => {
      const rect = element.getBoundingClientRect();
      setCanvasSize({
        width: Math.round(rect.width),
        height: Math.round(rect.height),
      });
    };

    updateSize();
    const observer = new ResizeObserver(updateSize);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const getWorldPointFromPointer = (clientX: number, clientY: number) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) {
      return { x: 0, y: 0 };
    }
    return {
      x: clientX - (rect.left + rect.width / 2) - pan.x,
      y: clientY - (rect.top + rect.height / 2) - pan.y,
    };
  };

  const getScreenPointFromPointer = (clientX: number, clientY: number) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) {
      return { x: 0, y: 0 };
    }
    return {
      x: clientX - (rect.left + rect.width / 2),
      y: clientY - (rect.top + rect.height / 2),
    };
  };

  const createBlock = (type: Builder2BlockType) => {
    setBlocks((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        type,
        x: prev.length * 12,
        y: prev.length * 12,
        children: [{ id: crypto.randomUUID(), label: "Sub 1" }],
      },
    ]);
  };

  const addChildToBlock = (blockId: string) => {
    setBlocks((prev) =>
      prev.map((block) =>
        block.id === blockId
          ? {
              ...block,
              children: [
                ...block.children,
                {
                  id: crypto.randomUUID(),
                  label: `Sub ${block.children.length + 1}`,
                },
              ],
            }
          : block
      )
    );
  };

  const startDrag = (id: string, clientX: number, clientY: number) => {
    const block = blocks.find((b) => b.id === id);
    if (!block) {
      return;
    }
    const pointer = getWorldPointFromPointer(clientX, clientY);
    setDragging({
      id,
      startX: block.x,
      startY: block.y,
      pointerX: pointer.x,
      pointerY: pointer.y,
    });
  };

  const startLink = (
    fromEndpointId: string,
    clientX: number,
    clientY: number
  ) => {
    const pointer = getScreenPointFromPointer(clientX, clientY);
    setLinking({
      fromEndpointId,
      pointerX: pointer.x,
      pointerY: pointer.y,
    });
  };

  const finishLink = (toId: string) => {
    if (!linking) {
      return;
    }
    setConnections((prev) => {
      const exists = prev.some((conn) => {
        return (
          conn.fromId === linking.fromEndpointId &&
          conn.toId === toId &&
          conn.id !== ""
        );
      });
      if (exists) {
        return prev;
      }
      return [
        ...prev,
        {
          id: crypto.randomUUID(),
          fromId: linking.fromEndpointId,
          toId,
        },
      ];
    });
  };

  const getCenterRelativeToCanvas = (element: HTMLElement | null) => {
    const canvas = canvasRef.current;
    if (!canvas || !element) {
      return null;
    }
    const canvasRect = canvas.getBoundingClientRect();
    const rect = element.getBoundingClientRect();
    return {
      x: rect.left + rect.width / 2 - (canvasRect.left + canvasRect.width / 2),
      y: rect.top + rect.height / 2 - (canvasRect.top + canvasRect.height / 2),
    };
  };

  const getInputPoint = (blockId: string) =>
    getCenterRelativeToCanvas(inputRefs.current[blockId] ?? null);

  const getOutputPoint = (endpointId: string) =>
    getCenterRelativeToCanvas(outputRefs.current[endpointId] ?? null);

  const buildPath = (
    from: { x: number; y: number },
    to: { x: number; y: number }
  ) => {
    const c1x = from.x + 72;
    const c2x = to.x - 72;
    return `M ${from.x} ${from.y} C ${c1x} ${from.y}, ${c2x} ${to.y}, ${to.x} ${to.y}`;
  };

  const toSvgPoint = (point: { x: number; y: number }) => ({
    x: canvasSize.width / 2 + point.x,
    y: canvasSize.height / 2 + point.y,
  });

  useEffect(() => {
    if (!dragging && !linking && !panning) {
      return;
    }

    const handleMove = (event: PointerEvent) => {
      if (panning) {
        const deltaX = event.clientX - panning.pointerX;
        const deltaY = event.clientY - panning.pointerY;
        setPan({
          x: Math.round(panning.startX + deltaX),
          y: Math.round(panning.startY + deltaY),
        });
      }

      const worldPointer = getWorldPointFromPointer(
        event.clientX,
        event.clientY
      );
      const screenPointer = getScreenPointFromPointer(
        event.clientX,
        event.clientY
      );
      if (dragging) {
        const deltaX = worldPointer.x - dragging.pointerX;
        const deltaY = worldPointer.y - dragging.pointerY;
        setBlocks((prev) =>
          prev.map((block) =>
            block.id === dragging.id
              ? {
                  ...block,
                  x: Math.round(dragging.startX + deltaX),
                  y: Math.round(dragging.startY + deltaY),
                }
              : block
          )
        );
      }
      if (linking) {
        setLinking({
          ...linking,
          pointerX: screenPointer.x,
          pointerY: screenPointer.y,
        });
      }
    };

    const handleUp = () => {
      setDragging(null);
      if (linking && hoveredInputId) {
        finishLink(hoveredInputId);
      }
      setLinking(null);
      setHoveredInputId(null);
      setPanning(null);
    };

    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerup", handleUp);
    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerup", handleUp);
    };
  }, [dragging, linking, hoveredInputId, panning, pan.x, pan.y]);

  return (
    <main className="relative min-h-svh overflow-hidden bg-surface">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(#6f6f7a2b 1px, transparent 1px)",
          backgroundSize: "18px 18px",
        }}
      />

      <header className="pointer-events-none fixed top-3 left-3 right-3 z-40 h-12">
        <div className="pointer-events-auto absolute left-0 top-0">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                type="button"
                size="icon"
                className="h-11 w-11 rounded-full bg-surface-container-low/95 shadow-lg backdrop-blur-sm"
              >
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 bg-surface-container-low">
              <SheetHeader>
                <SheetTitle className="font-headline text-left text-primary">
                  Design Studio
                </SheetTitle>
              </SheetHeader>
              <nav className="mt-6 flex flex-col gap-1">
                {navItems.map((item) => (
                  <SheetClose key={item.to} asChild>
                    <Link
                      to={item.to}
                      className="flex items-center gap-3 rounded-xl py-2.5 pr-4 pl-3 font-label text-xs font-medium tracking-wider text-slate-700 uppercase hover:bg-surface-container-highest hover:text-primary"
                    >
                      <span className="material-symbols-outlined text-[20px]">
                        {item.icon}
                      </span>
                      {item.title}
                    </Link>
                  </SheetClose>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <div
        ref={canvasRef}
        className="relative h-svh w-full overflow-hidden"
        style={{ cursor: panning ? "grabbing" : "default" }}
        onPointerDown={(event) => {
          if (event.button !== 1) {
            return;
          }
          event.preventDefault();
          setPanning({
            startX: pan.x,
            startY: pan.y,
            pointerX: event.clientX,
            pointerY: event.clientY,
          });
        }}
        onMouseDown={(event) => {
          if (event.button === 1) {
            event.preventDefault();
          }
        }}
      >
        <div
          className="pointer-events-none absolute top-0 h-full w-px bg-outline-variant/20"
          style={{ left: `calc(50% + ${pan.x}px)` }}
        />
        <div
          className="pointer-events-none absolute left-0 h-px w-full bg-outline-variant/20"
          style={{ top: `calc(50% + ${pan.y}px)` }}
        />
        <div
          className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-md bg-surface-container-high px-2 py-1 text-[11px] text-on-surface-variant"
          style={{
            left: `calc(50% + ${pan.x}px)`,
            top: `calc(50% + ${pan.y}px)`,
          }}
        >
          {centerLabel}
        </div>

        <svg
          className="pointer-events-none absolute inset-0 z-0 h-full w-full"
          viewBox={`0 0 ${Math.max(canvasSize.width, 1)} ${Math.max(
            canvasSize.height,
            1
          )}`}
          preserveAspectRatio="none"
        >
            {connections.map((conn) => {
              const fromPoint = getOutputPoint(conn.fromId);
              const toPoint = getInputPoint(conn.toId);
              if (!fromPoint || !toPoint) {
                return null;
              }
              const from = toSvgPoint(fromPoint);
              const to = toSvgPoint(toPoint);
              const pathId = `conn-path-${conn.id}`;
              const pathData = buildPath(from, to);
              return (
                <g key={conn.id}>
                  <path id={pathId} d={pathData} fill="none" stroke="none" />
                  <path
                    d={pathData}
                    stroke="#334155"
                    strokeWidth="3"
                    fill="none"
                    opacity="0.25"
                  />
                  <path
                    d={pathData}
                    stroke="#334155"
                    strokeWidth="1.75"
                    fill="none"
                    opacity="0.95"
                  />
                  <circle r="3" fill="#111111" opacity="0.95">
                    <animateMotion
                      dur="3s"
                      repeatCount="indefinite"
                      rotate="auto"
                    >
                      <mpath href={`#${pathId}`} />
                    </animateMotion>
                  </circle>
                </g>
              );
            })}

            {linking ? (
              (() => {
                const fromPoint = getOutputPoint(linking.fromEndpointId);
                if (!fromPoint) {
                  return null;
                }
                const from = toSvgPoint(fromPoint);
                const to = toSvgPoint({
                  x: linking.pointerX,
                  y: linking.pointerY,
                });
                return (
                  <path
                    d={buildPath(from, to)}
                    stroke="#2563eb"
                    strokeWidth="2.5"
                    fill="none"
                    strokeDasharray="6 4"
                  />
                );
              })()
            ) : null}
        </svg>

        {blocks.map((block) => (
          <div
            key={block.id}
            className="absolute left-1/2 top-1/2 z-10"
            style={{
              transform: `translate(calc(-50% + ${pan.x + block.x}px), calc(-50% + ${pan.y + block.y}px))`,
            }}
          >
            <button
              type="button"
              className="absolute top-1/2 -left-2.5 z-20 h-5 w-5 -translate-y-1/2 rounded-[4px] border border-slate-400 bg-white"
              title="Entrada"
              ref={(node) => {
                inputRefs.current[block.id] = node;
              }}
              onPointerEnter={() => {
                if (linking) {
                  setHoveredInputId(block.id);
                }
              }}
              onPointerLeave={() => {
                if (hoveredInputId === block.id) {
                  setHoveredInputId(null);
                }
              }}
            />

            <div
              className="cursor-grab active:cursor-grabbing"
              onPointerDown={(event) => {
                if (event.button !== 0) {
                  return;
                }
                startDrag(block.id, event.clientX, event.clientY);
              }}
            >
              <Card className="w-56 rounded-xl border bg-white p-3 text-left shadow-md">
                <div className="mb-2 flex items-center justify-between gap-2">
                  <p className="text-xs font-semibold uppercase text-on-surface-variant">
                    {blockFactory[block.type].label}
                  </p>
                  <Button
                    type="button"
                    size="icon"
                    variant="outline"
                    className="h-6 w-6 rounded-md"
                    onPointerDown={(event) => event.stopPropagation()}
                    onClick={(event) => {
                      event.stopPropagation();
                      addChildToBlock(block.id);
                    }}
                    title="Adicionar componente filho"
                  >
                    <Plus className="size-3.5" />
                  </Button>
                </div>
                <p className="text-xs text-on-surface-variant">
                  x: {block.x} | y: {block.y}
                </p>

                {block.children.length > 0 ? (
                  <div className="mt-3 space-y-1">
                    {block.children.map((child) => (
                      <div
                        key={child.id}
                        className="relative flex items-center rounded-md border border-outline-variant/30 px-2 py-1.5"
                      >
                        <span className="text-[11px] text-on-surface-variant">
                          {child.label}
                        </span>
                        <button
                          type="button"
                          className="absolute top-1/2 -right-2.5 z-20 h-5 w-5 -translate-y-1/2 rounded-[4px] border border-blue-600 bg-blue-100"
                          title={`Saída do ${child.label}`}
                          ref={(node) => {
                            outputRefs.current[`child:${block.id}:${child.id}`] = node;
                          }}
                          onPointerDown={(event) => {
                            event.stopPropagation();
                            startLink(
                              `child:${block.id}:${child.id}`,
                              event.clientX,
                              event.clientY
                            );
                          }}
                        />
                      </div>
                    ))}
                  </div>
                ) : null}
              </Card>
            </div>
          </div>
        ))}
      </div>

      <div className="fixed top-18 right-4 z-40 hidden w-72 rounded-xl border border-outline-variant/15 bg-white/90 p-3 text-xs shadow-lg backdrop-blur-sm md:block">
        <p className="mb-2 font-semibold text-on-surface">Registro de conexões</p>
        {connections.length === 0 ? (
          <p className="text-on-surface-variant">Nenhuma conexão ainda.</p>
        ) : (
          <div className="space-y-1">
            {connections.map((conn, index) => (
              <p key={conn.id} className="text-on-surface-variant">
                {index + 1}. {conn.fromId.replace(/^child:/, "")} -&gt;{" "}
                {conn.toId.slice(0, 6)}
              </p>
            ))}
          </div>
        )}
      </div>

      <div className="pointer-events-none fixed inset-x-0 bottom-6 z-40 flex justify-center">
        <TooltipProvider>
          <div className="pointer-events-auto flex items-center gap-2 rounded-full border border-outline-variant/15 bg-surface-container-low/90 px-3 py-2 shadow-xl backdrop-blur-sm">
            {(Object.keys(blockFactory) as Builder2BlockType[]).map((type) => {
              const conf = blockFactory[type];
              const Icon = conf.icon;
              return (
                <Tooltip key={type}>
                  <TooltipTrigger asChild>
                    <Button
                      type="button"
                      size="icon"
                      variant="signature"
                      className="h-11 w-11 rounded-full"
                      onClick={() => createBlock(type)}
                    >
                      <Icon className="size-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="top" sideOffset={8}>
                    Adicionar {conf.label}
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </div>
        </TooltipProvider>
      </div>
    </main>
  );
}
