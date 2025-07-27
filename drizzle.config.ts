import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/lib/db/schema.ts',
  out: './drizzle',
  dialect: 'sqlite',
  driver: 'd1-http',
  dbCredentials: {
    accountId: process.env.CLOUDFLARE_ACCOUNT_ID!,
    databaseId: 'c0609d3d-f1f0-4525-aae2-92f07eb0a4aa',
    token: process.env.CLOUDFLARE_API_TOKEN!
  }
});
