"use client";

import { Input } from "@/src/components/ui/input";
import { Ephesis } from "next/font/google";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

export function SearchInput() {
  const router = useRouter();
  const params = useSearchParams();
  const [value, setValue] = useState(params.get("q") ?? "");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!value) {
      router.push("/notes");
      return;
    }

    router.push(`?q=${encodeURIComponent(value)}`);
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Busque por vinho, produtor ou safra"
        className="w-full"
      />
    </form>
  );
}
