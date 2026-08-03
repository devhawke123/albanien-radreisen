alter table public.requests
  add column if not exists address text,
  add column if not exists guests integer;
