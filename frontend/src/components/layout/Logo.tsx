import { Building2 } from "lucide-react";

export default function Logo() {
  return (
    <div className="flex items-center gap-2">
      <div className="rounded-xl bg-primary p-2 text-primary-foreground">
        <Building2 size={20} />
      </div>

      <div>
        <h1 className="font-bold text-lg">
          T420 SaaS
        </h1>

        <p className="text-xs text-muted-foreground">
          Multiempresa
        </p>
      </div>
    </div>
  );
}