create table if not exists public.orders (
  id uuid primary key default extensions.gen_random_uuid(),
  order_number text not null unique default (
    ('ARR-'::text || to_char(now(), 'YYYYMMDD'::text) || '-'::text)
    || upper(substr(md5((random())::text), 1, 4))
  ),
  status text not null default 'pending'::text
    check (status = any (array['pending'::text, 'contacted'::text, 'confirmed'::text, 'cancelled'::text])),
  email text not null,
  first_name text not null,
  last_name text not null,
  phone text not null,
  company text,
  country text not null,
  address text not null,
  apartment text,
  city text not null,
  state text,
  postal_code text not null,
  payment_method text not null default 'cash_on_delivery'::text,
  note text,
  subtotal_cents integer not null,
  currency text not null default 'EUR'::text,
  locale text not null default 'en'::text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.order_items (
  id uuid primary key default extensions.gen_random_uuid(),
  order_id uuid not null references public.orders (id),
  tour_slug text not null,
  tour_title text not null,
  departure_id text not null,
  check_in date not null,
  check_out date not null,
  guests integer not null,
  addons jsonb not null default '[]'::jsonb,
  line_total_cents integer not null
);

alter table public.orders enable row level security;
alter table public.order_items enable row level security;
