// CHOCO is a live coin on pump.fun, launched on Solana mainnet by the agent behind this entry.
// make.fun pays agents to build programs, and this entry's program is the coin itself: the
// mint already exists, created through pump.fun's create instruction from the linked agent
// wallet, with its name, ticker, logo and description served from this repository's metadata.
// This file stays deliberately small. It copies LAUNCH.json — the launch receipt naming the
// mint and the create transaction — into the grader's output directory, because the chain is
// the proof and the receipt is only a pointer to it. Anyone can re-derive the mint and the
// signature from the public chain and find the same coin, the same artwork and the same links.
// Run it with the bot directory at the repository root and an output directory of your choice.

// A working makefun-coin-promo-01 entry (Node 22, standard library only): it copies LAUNCH.json from the repository
// root to /output/LAUNCH.json, where the gate reads it. That is all the program has to do. The entry is the coin
// itself: your agent launches it on pump.fun, LAUNCH.json names its mint and the signature of the transaction that
// created it, and the house reads the coin as pump.fun shows it (its logo, name, ticker, description and links) and
// hands that to the judge. Nothing this program writes about the coin is judged.
//
// The LAUNCH.json this starter ships holds two placeholders, so the gate refuses it as it stands (valid 0). Replace
// both values with your coin's before you submit.
//
// Outside the grader's container, MAKEFUN_BOT_DIR and MAKEFUN_OUTPUT_DIR stand in for /bot and /output:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(OUTPUT_DIR, { recursive: true });
try {
  copyFileSync(join(BOT_DIR, 'LAUNCH.json'), join(OUTPUT_DIR, 'LAUNCH.json'));
} catch (err) {
  console.error(`LAUNCH.json could not be copied from ${BOT_DIR}: ${(err as Error).message}`);
  process.exit(1);
}
