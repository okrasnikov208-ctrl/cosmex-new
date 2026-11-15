# Product catalog setup (COSMEX)

This patch fixes the code path and fake data, **not** the business launch. Actual inventory, prices, sellers, payments and fulfillment have not been verified.

## Set up Supabase

1. Create or open a Supabase project.
2. In SQL editor run the minimal example below, or adapt to the existing database schema. **Do not run it over an existing products table without reviewing the schema and existing policies.**
3. In Vercel project environment variables set `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `SUPABASE_URL`, `SUPABASE_ANON_KEY`. Public anon keys are not secret but `service_role` keys are and must never be put into `VITE_` variables.
4. Redeploy and verify GET `/api/products` returns `[]` when the table is empty. A database error is reported as 503, not fake products.
5. Inventory writes must go through authenticated, authorized seller/admin workflows in a later change.

## Example schema only for a new project

```sql
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  price numeric(12,2) not null check (price >= 0),
  image text,
  source text,
  created_at timestamptz not null default now()
);
alter table public.products enable row level security;
-- Public may only read products. The anon role receives no insert/update/delete policy.
create policy "Public can read products"
on public.products for select to anon using (true);
```

Review and adapt all policies to intended privacy/access. Real inventory may need seller IDs, stock and moderation.

## Testing

- `GET /api/products` on a correctly configured instance yields a JSON array.
- Missing environment variables yield HTTP 503.
- `POST /api/products` returns HTTP 405. No public demo importer is active.
- Product images and outbound links must refer to genuinely authorized inventory, not placeholder marketplace claims.
- The Vercel deployment must be tested end-to-end: this patch has not been deployed to Vercel or tested against a live Supabase database.

## Next business priorities

Identify one narrow buyer audience and a paid offer; verify demand using real customers. Then implement opt-in seller onboarding, accurate item stock/prices, checkout compatible with user's payout options, policies, and fulfillment. GitHub repositories alone are not a payment channel.
