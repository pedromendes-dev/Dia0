/*
  # Esquema inicial do banco de dados

  1. Novas Tabelas
    - `users` (usuários)
      - `id` (uuid, chave primária)
      - `email` (texto, único)
      - `nome` (texto)
      - `foto` (texto, URL da foto)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `eventos` (eventos)
      - `id` (uuid, chave primária)
      - `titulo` (texto)
      - `descricao` (texto)
      - `data` (timestamp)
      - `local` (texto)
      - `imagem` (texto, URL da imagem)
      - `preco` (decimal)
      - `categoria` (texto)
      - `organizador_id` (uuid, referência a users)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `ingressos` (ingressos comprados)
      - `id` (uuid, chave primária)
      - `evento_id` (uuid, referência a eventos)
      - `usuario_id` (uuid, referência a users)
      - `quantidade` (inteiro)
      - `valor_total` (decimal)
      - `status` (texto)
      - `created_at` (timestamp)

  2. Segurança
    - RLS habilitado em todas as tabelas
    - Políticas de acesso para usuários autenticados
*/

-- Criar tabela de usuários
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  nome text,
  foto text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Criar tabela de eventos
CREATE TABLE IF NOT EXISTS eventos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  titulo text NOT NULL,
  descricao text,
  data timestamptz NOT NULL,
  local text NOT NULL,
  imagem text,
  preco decimal(10,2) DEFAULT 0,
  categoria text NOT NULL,
  organizador_id uuid REFERENCES users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Criar tabela de ingressos
CREATE TABLE IF NOT EXISTS ingressos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  evento_id uuid REFERENCES eventos(id),
  usuario_id uuid REFERENCES users(id),
  quantidade integer NOT NULL DEFAULT 1,
  valor_total decimal(10,2) NOT NULL,
  status text NOT NULL DEFAULT 'pendente',
  created_at timestamptz DEFAULT now()
);

-- Habilitar RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE eventos ENABLE ROW LEVEL SECURITY;
ALTER TABLE ingressos ENABLE ROW LEVEL SECURITY;

-- Políticas de segurança para users
CREATE POLICY "Usuários podem ler seus próprios dados"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Usuários podem atualizar seus próprios dados"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Políticas de segurança para eventos
CREATE POLICY "Qualquer um pode ver eventos"
  ON eventos
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Organizadores podem criar eventos"
  ON eventos
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = organizador_id);

CREATE POLICY "Organizadores podem atualizar seus eventos"
  ON eventos
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = organizador_id);

-- Políticas de segurança para ingressos
CREATE POLICY "Usuários podem ver seus próprios ingressos"
  ON ingressos
  FOR SELECT
  TO authenticated
  USING (auth.uid() = usuario_id);

CREATE POLICY "Usuários podem comprar ingressos"
  ON ingressos
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = usuario_id);