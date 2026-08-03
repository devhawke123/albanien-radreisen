create table if not exists public.requests (
  id uuid primary key default gen_random_uuid(),
  type text not null check (type = any (array['contact'::text, 'tour_request'::text])),
  status text not null default 'new'::text
    check (status = any (array['new'::text, 'contacted'::text, 'closed'::text])),
  name text not null,
  email text not null,
  phone text,
  subject text,
  message text,
  tour_slug text,
  tour_title text,
  preferred_departure text,
  addons_summary text,
  locale text not null default 'en'::text,
  created_at timestamptz not null default now()
);

alter table public.requests enable row level security;
