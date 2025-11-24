import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
    <div className="flex justify-end w-full gap-1">
      {listTypes.map((e) => (
        <Button
          variant={"outline"}
          onClick={() => setListStyle(e.type)}
          className={listStyle === e.type ? "bg-secondary" : ""}
        >
          {e.icon}
        </Button>
      ))}
      <div className="flex items-center gap-2 justify-end px-2 relative">
        <Search className="absolute right-4 text-primary/60" size={15} />
        <Input
          placeholder="Buscar..."
          value={filter}
          onChange={(e) => onChange(e.target.value)}
          className="max-w-[300px]"
        />
      </div>
    </div>
  );
}
