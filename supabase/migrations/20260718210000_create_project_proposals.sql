-- Project proposals and Stripe payment tracking for the client portal.

create table if not exists public.project_proposals (
  id uuid primary key default gen_random_uuid(),
  project_brief_id uuid not null references public.project_briefs (id) on delete cascade,
  title text not null,
  total_price_eur numeric(12, 2) not null check (total_price_eur >= 0),
  deposit_amount_eur numeric(12, 2) not null check (deposit_amount_eur >= 0),
  estimated_delivery text not null,
  proposal_status text not null default 'draft'
    check (proposal_status in ('draft', 'ready', 'accepted', 'paid')),
  stripe_checkout_session_id text,
  payment_status text not null default 'unpaid'
    check (payment_status in ('unpaid', 'pending', 'paid', 'failed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (project_brief_id)
);

create index if not exists project_proposals_brief_id_idx
  on public.project_proposals (project_brief_id);

create index if not exists project_proposals_checkout_session_idx
  on public.project_proposals (stripe_checkout_session_id)
  where stripe_checkout_session_id is not null;

create or replace function public.set_project_proposals_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists project_proposals_set_updated_at on public.project_proposals;

create trigger project_proposals_set_updated_at
before update on public.project_proposals
for each row
execute function public.set_project_proposals_updated_at();

alter table public.project_proposals enable row level security;

drop policy if exists "Anyone can read project proposals" on public.project_proposals;

create policy "Anyone can read project proposals"
  on public.project_proposals
  for select
  to anon, authenticated
  using (true);
