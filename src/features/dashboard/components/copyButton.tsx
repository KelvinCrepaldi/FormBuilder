import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";

export default function CopyButton({ text }: { text: string }) {
  const [locked, setLocked] = useState(false);

  const copy = async () => {
    if (locked) return; // impede cliques durante o lock

    await navigator.clipboard.writeText(text);
    setLocked(true);

    setTimeout(() => {
      setLocked(false);
    }, 3000);
  };

  return (
    <Button
      onClick={copy}
      size="sm"
      variant="outline"
      disabled={locked}
    >
      {locked ? <Check /> : <Copy />}
    </Button>
  );
}
