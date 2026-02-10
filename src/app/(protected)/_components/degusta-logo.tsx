import clsx from "clsx";
import { WineIcon } from "lucide-react";

export function DegustaLogo() {
  const iconClasses = clsx("text-rose-950 w-6 h-6");
  const logoClasses = clsx("bg-rose-950 rounded-sm text-slate-50 p-2");
  return (
    <>
      <div className="flex items-center gap-2">
        <WineIcon className={iconClasses} />
        <p className="font-bold">
          Degusta <span className={logoClasses}>notes</span>
        </p>
      </div>
      <p className="text-muted-foreground text-sm">By Danio Braga</p>
    </>
  );
}
