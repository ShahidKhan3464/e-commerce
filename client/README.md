# E-Commerce Frontend (Zustand)

This repository contains a feature-complete frontend scaffold for an e-commerce application using React, Tailwind CSS and Zustand for state management.

## Features included

- Auth pages (login, register, forgot/reset password)
- Landing / Products / Product details
- Protected routes and Admin routes
- Role-aware layout (Header + Sidebar + Footer)
- Generic UI components: Button, Card, Table, Input
- Zustand stores: authStore, productStore, orderStore
- Services: authService, productService, orderService, adminService
- Dashboard with stats and charts (Recharts)

## How to run

1. `npm install`
2. Create a `.env` file with `VITE_API_URL` pointing to your backend (e.g. http://localhost:5000/api)
3. `npm run dev`
