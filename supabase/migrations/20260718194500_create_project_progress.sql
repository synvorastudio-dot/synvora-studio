-- Per-stage progress for client portal timelines.

create table if not exists public.project_progress (
  id uuid primary key default gen_random_uuid(),
  project_brief_id uuid not null references public.project_briefs (id) on delete cascade,
  stage_id text not null,
  status text not null default 'upcoming'
    check (status in ('completed', 'in_progress', 'upcoming')),
  description text not null,
  progress_percentage integer not null default 0
    check (progress_percentage >= 0 and progress_percentage <= 100),
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (project_brief_id, stage_id)
);

create index if not exists project_progress_brief_id_idx
  on public.project_progress (project_brief_id);

create index if not exists project_progress_brief_stage_idx
  on public.project_progress (project_brief_id, stage_id);

create or replace function public.set_project_progress_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists project_progress_set_updated_at on public.project_progress;

create trigger project_progress_set_updated_at
before update on public.project_progress
for each row
execute function public.set_project_progress_updated_at();

alter table public.project_progress enable row level security;

-- Clients can read progress for their project (via server-side lookups).
create policy "Anyone can read project progress"
  on public.project_progress
  for select
  to anon, authenticated
  using (true);
