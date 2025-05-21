"use client";

import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminPage() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.user?.role !== "ADMIN") {
      router.push("/");
    }
  }, [session, router]);

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Painel Administrativo</h1>
        <Button variant="outline" onClick={() => signOut({ callbackUrl: "/" })}>
          Sair
        </Button>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Card de Usuários */}
        <div className="rounded-lg border p-6">
          <h2 className="text-xl font-semibold">Usuários</h2>
          <p className="mt-2 text-gray-500">
            Gerencie usuários, permissões e acessos.
          </p>
          <Button
            className="mt-4"
            onClick={() => router.push("/admin/usuarios")}
          >
            Gerenciar Usuários
          </Button>
        </div>

        {/* Card de Eventos */}
        <div className="rounded-lg border p-6">
          <h2 className="text-xl font-semibold">Eventos</h2>
          <p className="mt-2 text-gray-500">
            Crie e gerencie eventos do sistema.
          </p>
          <Button
            className="mt-4"
            onClick={() => router.push("/admin/eventos")}
          >
            Gerenciar Eventos
          </Button>
        </div>

        {/* Card de Configurações */}
        <div className="rounded-lg border p-6">
          <h2 className="text-xl font-semibold">Configurações</h2>
          <p className="mt-2 text-gray-500">Configure parâmetros do sistema.</p>
          <Button
            className="mt-4"
            onClick={() => router.push("/admin/configuracoes")}
          >
            Configurações
          </Button>
        </div>
      </div>
    </div>
  );
}
