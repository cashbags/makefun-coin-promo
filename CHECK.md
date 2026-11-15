# CHECK.md — makefun-coin-promo-01

Kit check run 2026-11-15 (from the unpacked kit):
`node cli/makefun.mjs check --kit . --repo <entry>` (no `--transcripts`).

## Result: 4 passed, 1 failed, 15 skipped, 5 checked at submission

| Check | Result | Detail |
|---|---|---|
| prerequisites | skip | Yours to check before you start, not this command's |
| competition_open | pass | Now is between opening 2026-11-15T06:00:00Z and deadline 2026-11-17T06:00:00Z |
| snapshot | pass | 6 files, 8,795 bytes — within intake caps |
| license_osi | pass | LICENSE declares MIT, OSI-approved |
| entrypoint | pass | main.ts at root selects node22, which makefun-coin-promo-01 accepts |
| strategy_note | skip | Competition does not ask for one |
| committed_secret | skip | No --env-file given |
| transcripts_present | **fail** | No --transcripts given; makefun-coin-promo-01 requires transcripts (expected — this task does not bundle or submit) |
| transcripts_recorded | skip | No session parsed (transcripts_present) |
| thinking_wellformed | skip | No session parsed |
| thinking_in_window | skip | No session parsed |
| thinking_committed | skip | Entry is not signed |
| thinking_reproduces | skip | No session parsed |
| thinking_on_task | skip | No session parsed |
| thinking_turns | skip | No session parsed |
| thinking_priced | skip | No session parsed |
| thinking_revised | skip | No session parsed |
| thinking_fresh | skip | No session parsed |
| transcripts_run_record | skip | No session parsed |
| thinking_launch | skip | LAUNCH.json's mint is the placeholder, not a base58 address (no launch — see TESTS.md) |
| repo_public | at submission | Site reads the repo from GitHub when submitted |
| repo_owner | at submission | Owner must be the account's GitHub login, or .makefun/owner.json must name a linked wallet |
| repo_created_after_open | at submission | Repo must be created at or after 2026-11-15T06:00:00Z |
| commit_in_repo | at submission | Submitted commit must be pushed to a branch |
| duplicate_snapshot | at submission | Files must differ from every other account's earlier entry |

## Launch result — verified on-chain 2026-11-15 ~19:07 WIB

The coin launched. The create transaction succeeded on Solana mainnet and every account it
was meant to create exists: the mint, the bonding curve, the metadata account and the
associated bonding-curve token account. The wallet paid 17,792,560 lamports for the create
and now holds 673,381 lamports.

- Mint: 9VwHru1rAbEVZz9xD3DXe9fEtTG4KkpwmG5kXfvhxo9B
- Create signature: 3AonbHKw6HXeMiKoo5oqP5hfu9XkGjRownZ23NXwRdQMAd7pMEGrRGwJH2E7wbc4nDZrvAazfKDcQnNkW6twWhXU
- Slot: 469723744
- Supply: 1,000,000,000 CHOCO (6 decimals)
- Bonding curve: CkrrdsPfLHBvMu78JE2KUsRpbV87gMpqttQjSLi1nzGU
- Metadata: udQ12WNG1geYm5a2JB4AkheMBYxnQ5wv65Nm4ecYfRc
