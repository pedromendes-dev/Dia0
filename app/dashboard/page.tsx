"use client";

import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

export default function DashboardPage() {
  const { data: session } = useSession();

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Button variant="outline" onClick={() => signOut({ callbackUrl: "/" })}>
          Sair
        </Button>
      </div>

      <div className="mt-6">
        <div className="rounded-lg border p-6">
          <h2 className="text-xl font-semibold">
            Bem-vindo, {session?.user?.name}!
          </h2>
          <p className="mt-2 text-gray-500">
            Esta é sua área protegida. Aqui você pode gerenciar suas informações
            e configurações.
          </p>
        </div>
      </div>
    </div>
  );
}
