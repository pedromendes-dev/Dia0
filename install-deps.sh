#!/bin/bash

# Instalar dependências principais
npm install next@latest react@latest react-dom@latest
npm install @radix-ui/react-slot @radix-ui/react-toast
npm install class-variance-authority clsx tailwind-merge
npm install lucide-react
npm install @tanstack/react-query
npm install zustand
npm install framer-motion
npm install @supabase/supabase-js

# Instalar dependências de desenvolvimento
npm install -D typescript @types/node @types/react @types/react-dom
npm install -D tailwindcss postcss autoprefixer
npm install -D eslint eslint-config-next
npm install -D jest @types/jest 