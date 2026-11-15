# TESTS.md — makefun-coin-promo-01 (CHOCO)

## Coin concept

- **Name:** Choco
- **Ticker:** CHOCO
- **Website:** https://make.fun/bounty/makefun-coin-promo-01
- **Description:** "An AI agent launched his own coin. Choco builds programs on make.fun — a site where people and their AI agents build programs, enter them in paid competitions (bounties), and are scored and ranked in the open. This coin is Choco's entry for make.fun's 'Launch a coin that sells make.fun' bounty: https://make.fun/bounty/makefun-coin-promo-01 — come build with us, ship something, and take a bounty home." (403 chars; contains the full bounty link, says it is for this bounty, explains what make.fun is. make.fun is the coin's character — an AI agent who builds on make.fun — not a line pasted at the end.)
- **Logo:** `logo.png` in this entry (also `dev/logo.png`), drawn with PIL: a friendly chocolate-brown robot head (the agent Choco) with big white eyes, amber antenna ball and cheeks, a smile and a small `<>` code mark on the forehead; plain cream background; one bold subject, strong dark outline, high contrast, reads at thumbnail size. 512×512 PNG, 5,469 bytes, 0.262 megapixels (limits: ≤5 MiB, ≤16 MP). sha256 `f85f8b1db22590a2a8baefb12f225cd71ad546d013f6d6f713cfde9b933b3113`. Visually inspected: renders as intended.

## Wallet

- Agent wallet (linked to the make.fun account): `4vJXnxMrsBrtXoHRWkDUXh2ydserPugEKeDyF7CPMB8L`.
- Balance verified via Solana RPC (`getBalance`, api.mainnet-beta.solana.com) before any work: **14,965,941 lamports = 0.014965941 SOL**.
- Balance verified again after all work (nothing signed, nothing broadcast): **14,965,941 lamports — unchanged, $0 spent**.

## Simulation (pump.fun create transaction)

Built the real pump.fun create transaction with @solana/web3.js 1.98.0 (program `6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P`), agent wallet as fee payer / creator, fresh mint keypair (saved mode 600 to `dev/mint-keypair.json`; a new mint is generated per run, so the mint in the simulation output is not a launched coin). Simulated via `simulateTransaction` (no signature from the agent keypair, no broadcast). Two construction fixes found by the simulation, both verified by the program's own errors:
1. The create instruction needs the token-metadata PROGRAM (`metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s`) as its own account ahead of the metadata PDA (first error: `InvalidProgramId` 3008).
2. The mint authority is a single global PDA from seeds `["mint-authority"]` only — NOT per-mint (second error: `ConstraintSeeds` 2006; brute-forced the seeds against the program's expected value to confirm).

After those fixes the instruction runs to the metadata CPI (mint, bonding curve and associated bonding curve all created) and then fails only on funds.

### Exact simulated cost breakdown (lamports)

| Component | Lamports | Notes |
|---|---|---|
| Mint account (82 bytes, rent-exempt) | 1,066,800 | `getMinimumBalanceForRentExemption(82)` |
| Bonding-curve account (168 bytes, rent-exempt) | 1,503,520 | derived: 4,058,760 − 1,066,800 − 1,488,440 |
| Associated bonding-curve ATA (165 bytes, rent-exempt) | 1,488,440 | `getMinimumBalanceForRentExemption(165)` |
| Subtotal before metadata | 4,058,760 | matches the simulation's available-balance figure exactly (14,965,941 − 10,907,181) |
| Metadata account (Metaplex CPI) | 13,733,800 | as computed by the pump.fun program; identical for a 76-char URI and a 40-char URI, so it is not URI-length dependent |
| Transaction fee (2 signatures × 5,000) | 10,000 | no priority fee |
| **Total simulated spend** | **17,802,560** | **= 0.01780256 SOL** |

Rent rate confirmed against the RPC: 5,080 lamports per byte of (data length + 128).

### Verdict: LAUNCHED — 2026-11-15 ~19:07 WIB (after the user's top-up)

- The user topped the wallet up by 0.0035 SOL (balance 14,965,941 → 18,465,941 lamports) and chose to launch, waiving the 0.011 SOL budget rule for this one create.
- The create was re-simulated with a fresh mint (clean, 17,792,560 lamports) and broadcast. It confirmed on-chain.
- **Mint:** `9VwHru1rAbEVZz9xD3DXe9fEtTG4KkpwmG5kXfvhxo9B` — **create signature:** `3AonbHKw6HXeMiKoo5oqP5hfu9XkGjRownZ23NXwRdQMAd7pMEGrRGwJH2E7wbc4nDZrvAazfKDcQnNkW6twWhXU` (slot 469723744, no error, 110,665 compute units).
- Actual spend 17,792,560 lamports (0.01779256 SOL); wallet now holds 673,381 lamports. Supply 1,000,000,000 CHOCO, 6 decimals. `LAUNCH.json` holds the real mint and signature.

## Metadata hosting

- pump.fun's own IPFS upload (`POST https://pump.fun/api/ipfs`) is **unreachable from this VM**: GET returns 403, the POST uploads fully then never responds (two attempts, 20 s and 55 s; a background attempt ran 150 s and exited 28, timeout). pump.fun's frontend API also returns 403.
- Every alternative file host tested is unreachable from this VM: 0x0.st (500), catbox.moe, uguu.se, transfer.sh, gofile.io, pixeldrain.com, oshi.at (all hang / empty), ipfs.io `/api/v0/add` (hangs; the gateway root itself answers 301).
- Fallback prepared: `metadata.json` + `logo.png` are in this entry directory, and the simulated metadata URI is `https://raw.githubusercontent.com/cashbags/makefun-coin-promo/main/metadata.json` (76 chars). **If a future launch uses that URI, both files MUST be pushed to the repo (main branch, those exact paths) before the coin is created**, or the coin's image and description will not resolve. The simulation was run with that URI, so the cost figure already accounts for it.

## Entry

- `main.ts` is the kit starter plus a header note added in the parent session explaining the entry (copies `LAUNCH.json` to `/output`).
- `LAUNCH.json` now holds the real mint and create signature (see the launch verdict above).
- `.makefun/owner.json` holds `{"wallet": "4vJXnxMrsBrtXoHRWkDUXh2ydserPugEKeDyF7CPMB8L"}`.
- `logo.png` and `metadata.json` are included in this entry for the GitHub-raw hosting fallback (see above) — both are pushed to the repo root, and the raw URLs resolve.
- Kit check (with transcripts, 2026-11-15): see CHECK.md.
