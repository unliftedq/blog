#!/usr/bin/env bash
# Generate editorial banners for posts and projects via imagent.
# Output: /static/images/banners/<slug>.png
set -uo pipefail

OUT_ROOT="$(cd "$(dirname "$0")/.." && pwd)/static/images/banners"
TMP_ROOT="$(mktemp -d)"
mkdir -p "$OUT_ROOT"
echo "Output dir: $OUT_ROOT"
echo "Tmp dir:    $TMP_ROOT"

PROVIDER=azure
MODEL=gpt-image-2-1
SIZE=1536x1024
QUALITY=medium
FMT=png

# Shared style suffix to keep the set visually coherent.
STYLE='Editorial, cinematic, museum-quality still life. Soft directional natural light from upper left. Beige, cream, ink, and warm amber palette. Fine 35mm film grain, subtle paper texture. No text, no typography, no logos, no watermarks. Single subject, generous negative space, magazine cover composition.'

declare -a SLUGS PROMPTS
add() {
  SLUGS+=("$1"); PROMPTS+=("$2 $STYLE")
}

# ---- Posts ----
add "start-raspberrypi-without-screen" \
"A vintage Raspberry Pi 2 single-board computer resting on a warm cream paper desk, a thin USB-to-TTL serial cable coiled gracefully beside it, faint solder rosin atmosphere, top-down view, depth of field on the small components."

add "lazy-list-with-generator-and-iterator" \
"An infinite paper ribbon unspooling along a long ivory desk, each segment marked with handwritten ink dots in a Fibonacci-like rhythm, the ribbon vanishing into soft warm fog at the far end, low warm sidelight, conceptual portrait of laziness and continuation."

add "crawling-stock-data-in-fsharp" \
"A vintage stock-ticker tape spilling from an old brass machine onto a cream desk, blurred amber price digits faintly reflected in lacquer, faint window light, single subject still life."

add "activitypub-from-decentralized-to-distributed-social-networks" \
"A constellation of small handmade paper folders connected by thin ink lines drawn on cream parchment, hand-cut paper origami planets floating between them, soft top-down light, conceptual image about a federated network."

add "the-future-of-ai-devices" \
"A sleek brushed-aluminum laptop and an unbranded matte phone resting side-by-side on cream stone, a soft warm amber halo of light at the horizon behind them, minimal, museum lighting, no brand logos."

# ---- Projects ----
# Slugs match the kebab-cased project name used in src/pages/index.tsx.
add "project-haskell-realworld-example" \
"A folded sheet of cream paper inscribed with a tiny lambda symbol in fountain-pen ink, resting on a worn oak desk beside a small glass of warm tea, soft window light, museum still life."

add "project-nuts-save-read" \
"An open hardcover notebook with cream pages, several handmade fabric bookmarks layered between the pages, a pair of brass reading glasses resting on top, soft afternoon light, calm reading-room mood."

add "project-stargaze-cli" \
"An old brass terminal-style instrument on a deep ink-black desk, a single tiny gold star pinned beside it, a faint constellation of pinpricks of light projected on the wall behind, museum still life, ink and amber palette."

PIDS=()
RESULTS=()

for i in "${!SLUGS[@]}"; do
  slug="${SLUGS[$i]}"
  prompt="${PROMPTS[$i]}"
  outdir="$TMP_ROOT/$slug"
  mkdir -p "$outdir"
  echo ">>> [$((i+1))/${#SLUGS[@]}] $slug"
  (
    imagent image "$prompt" \
      --provider "$PROVIDER" \
      --model "$MODEL" \
      --option "size=$SIZE" \
      --option "quality=$QUALITY" \
      --option "outputFormat=$FMT" \
      --out "$outdir" \
      > "$outdir/imagent.log" 2>&1
    rc=$?
    if [[ $rc -ne 0 ]]; then
      echo "FAIL $slug (rc=$rc) — see $outdir/imagent.log" >&2
      exit $rc
    fi
    # Pick the first image artifact written by imagent to the out dir.
    img="$(ls -1 "$outdir"/*.png "$outdir"/*.jpg "$outdir"/*.jpeg "$outdir"/*.webp 2>/dev/null | grep -v imagent.log | head -1)"
    if [[ -z "$img" ]]; then
      echo "FAIL $slug: no output file in $outdir" >&2
      exit 2
    fi
    cp "$img" "$OUT_ROOT/$slug.png"
    echo "OK   $slug -> $OUT_ROOT/$slug.png"
  ) &
  PIDS+=($!)
done

# Wait for all
fail=0
for pid in "${PIDS[@]}"; do
  if ! wait "$pid"; then
    fail=1
  fi
done

if [[ $fail -ne 0 ]]; then
  echo "Some generations failed. See logs in $TMP_ROOT/*/imagent.log" >&2
  exit 1
fi

echo "All banners generated."
ls -la "$OUT_ROOT"
