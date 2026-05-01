# ── Build stage ──────────────────────────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies first (cached layer)
COPY sky-gate-site/package*.json ./
RUN npm ci

# Copy Astro source
COPY sky-gate-site/ ./

# Copy images into the public directory
COPY images/ ./public/images/

# Copy PDFs into public/docs
COPY images/*.pdf ./public/docs/

# Build site + run pagefind indexer
RUN npm run build

# ── Serve stage ───────────────────────────────────────────────────────────────
FROM nginx:1.27-alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
