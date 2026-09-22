# Pulled from Google's pull-through mirror of Docker Hub rather than
# docker.io directly: anonymous Docker Hub pulls are rate-limited per IP
# (100/6h) and the VPS started hitting HTTP 429s, which broke deploys.
# Same upstream image, served by digest. Override with
# `--build-arg NODE_IMAGE=node:22-alpine` to go back to Docker Hub.
ARG NODE_IMAGE=mirror.gcr.io/library/node:22-alpine

# --- deps: install dependencies only (cached separately from source changes) ---
FROM ${NODE_IMAGE} AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# --- builder: build the Next.js app ---
FROM ${NODE_IMAGE} AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# --- runner: minimal production image ---
FROM ${NODE_IMAGE} AS runner
WORKDIR /app
ENV NODE_ENV=production

RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001
RUN mkdir -p /app/data && chown -R nextjs:nodejs /app/data

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
ENV ARTICLES_DATA_PATH=/app/data/articles.json

CMD ["node", "server.js"]
