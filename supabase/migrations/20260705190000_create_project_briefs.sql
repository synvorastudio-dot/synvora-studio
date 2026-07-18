-- Project briefs submitted via the Synvora AI Project Builder.

create table if not exists public.project_briefs (
  id uuid primary key default gen_random_uuid(),
  project_id text not null unique,
  received_at timestamptz not null default now(),
  summary text not null,
  brief jsonb not null,
  current_stage_id text not null default 'submitted',
  contact_email text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists project_briefs_contact_email_idx
  on public.project_briefs (contact_email);

create index if not exists project_briefs_received_at_idx
  on public.project_briefs (received_at desc);

create or replace function public.set_project_briefs_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists project_briefs_set_updated_at on public.project_briefs;

create trigger project_briefs_set_updated_at
before update on public.project_briefs
for each row
execute function public.set_project_briefs_updated_at();

alter table public.project_briefs enable row level security;

-- Public can submit briefs via the anon key (insert only).
create policy "Anyone can submit a project brief"
  on public.project_briefs
  for insert
  to anon, authenticated
  with check (true);

-- Clients can read their own brief by project ID (for /my-project lookups).
create policy "Anyone can read a brief by project id"
  on public.project_briefs
  for select
  to anon, authenticated
  using (true);
