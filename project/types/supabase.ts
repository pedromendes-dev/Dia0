export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          nome: string | null
          foto: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          nome?: string | null
          foto?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          nome?: string | null
          foto?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      eventos: {
        Row: {
          id: string
          titulo: string
          descricao: string | null
          data: string
          local: string
          imagem: string | null
          preco: number
          categoria: string
          organizador_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          titulo: string
          descricao?: string | null
          data: string
          local: string
          imagem?: string | null
          preco?: number
          categoria: string
          organizador_id: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          titulo?: string
          descricao?: string | null
          data?: string
          local?: string
          imagem?: string | null
          preco?: number
          categoria?: string
          organizador_id?: string
          created_at?: string
          updated_at?: string
        }
      }
      ingressos: {
        Row: {
          id: string
          evento_id: string
          usuario_id: string
          quantidade: number
          valor_total: number
          status: string
          created_at: string
        }
        Insert: {
          id?: string
          evento_id: string
          usuario_id: string
          quantidade?: number
          valor_total: number
          status?: string
          created_at?: string
        }
        Update: {
          id?: string
          evento_id?: string
          usuario_id?: string
          quantidade?: number
          valor_total?: number
          status?: string
          created_at?: string
        }
      }
    }
  }
}