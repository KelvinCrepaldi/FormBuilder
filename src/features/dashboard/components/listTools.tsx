import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { CardSimIcon, List, Search } from "lucide-react";

type ListToolsProps = {
  onChange: React.Dispatch<string>;
  filter: string;
  setListStyle: React.Dispatch<string>;
  listStyle: string;
};

const listTypes = [
  { type: "list", icon: <List /> },
  { type: "card", icon: <CardSimIcon /> },
];

export default function ListTools({
  onChange,
  filter,
  listStyle,
  setListStyle,
}: ListToolsProps) {
  return (
    <Card className="editorial-shadow flex flex-col gap-4 rounded-2xl border border-outline-variant/10 bg-surface-container-low p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex gap-1">
        {listTypes.map((e) => (
          <Button
            key={e.type}
            type="button"
            variant="outline"
            size="icon"
            onClick={() => setListStyle(e.type)}
            className={
              listStyle === e.type
                ? "border-primary/30 bg-secondary-container text-primary"
                : "border-outline-variant/20"
            }
            aria-label={e.type === "list" ? "Vista em lista" : "Vista em cartões"}
          >
            {e.icon}
          </Button>
        ))}
      </div>
      <div className="relative flex flex-1 justify-end">
        <Search
          className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-primary/50"
          aria-hidden
        />
        <Input
          placeholder="Buscar..."
          value={filter}
          onChange={(ev) => onChange(ev.target.value)}
          className="max-w-full rounded-xl border-outline-variant/20 pr-10 sm:max-w-[320px]"
        />
      </div>
    </Card>
  );
}
