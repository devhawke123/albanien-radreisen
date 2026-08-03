-- Admin auth tables + RPCs used by admin-* edge functions.
create extension if not exists pgcrypto with schema extensions;

create table if not exists public.admin_users (
  id uuid primary key default extensions.gen_random_uuid(),
  username text not null unique,
  password_hash text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.admin_sessions (
  token uuid primary key default extensions.gen_random_uuid(),
  admin_id uuid not null references public.admin_users (id),
  expires_at timestamptz not null default (now() + interval '7 days'),
  created_at timestamptz not null default now()
);

alter table public.admin_users enable row level security;
alter table public.admin_sessions enable row level security;

create or replace function public.admin_login(p_username text, p_password text)
returns table (session_token uuid, expires_at timestamptz)
language plpgsql
security definer
set search_path to 'public', 'extensions'
as $function$
declare
  v_admin_id uuid;
begin
  select id into v_admin_id
  from public.admin_users
  where username = p_username
    and password_hash = crypt(p_password, password_hash);

  if v_admin_id is null then
    return;
  end if;

  return query
  insert into public.admin_sessions (admin_id)
  values (v_admin_id)
  returning admin_sessions.token, admin_sessions.expires_at;
end;
$function$;

create or replace function public.admin_verify_session(p_token uuid)
returns table (admin_id uuid, username text)
language sql
security definer
set search_path to 'public'
as $function$
  select u.id, u.username
  from public.admin_sessions s
  join public.admin_users u on u.id = s.admin_id
  where s.token = p_token and s.expires_at > now();
$function$;

create or replace function public.admin_logout(p_token uuid)
returns void
language sql
security definer
set search_path to 'public'
as $function$
  delete from public.admin_sessions where token = p_token;
$function$;

-- Create the first admin after deploy (run once in SQL editor):
-- insert into public.admin_users (username, password_hash)
-- values ('admin', crypt('CHANGE_ME', extensions.gen_salt('bf')));
