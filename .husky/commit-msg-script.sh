#!/bin/sh

COMMIT_MSG_FILE="$1"

# Controlla che il file esista
if [ ! -f "$COMMIT_MSG_FILE" ]; then
  echo "Errore: file del messaggio di commit non trovato!"
  exit 1
fi

# ---- Controllo commit convention prima di modificare ----
MSG=$(cat "$COMMIT_MSG_FILE")
ALLOWED_TYPES="(\[add\]|\[chance\]|\[update\]|\[fix\]|\[delete\]|\[refactor\]|\[perf\]|feat|fix|chore|refactor|perf|docs|test|style|ci|build|revert|hotfix)(\([^)]+\))?(!)?:?"

if ! echo "$MSG" | grep -qE "^$ALLOWED_TYPES"; then
  echo "Errore: commit non conforme. Usa uno dei tipi consentiti"
  echo "[add], [chance], [update], [fix], [delete], [refactor], [perf], feat:, fix:, chore:, refactor:, perf:, docs:, test:, style:, ci:, build:, revert:, hotfix:"
  exit 1
fi


# ---- Conversione dei tipi in convenzione standard (feat:, fix:, ecc.) ----
unameOut="$(uname -s 2>/dev/null || echo Unknown)"
case "${unameOut}" in
  Darwin*)
    sed -i '' \
      -e 's/^\[add\]/feat:/g' \
      -e 's/^\[fix\]/fix:/g' \
      -e 's/^\[update\]/fix:/g' \
      -e 's/^\[delete\]/chore:/g' \
      -e 's/^\[refactor\]/refactor:/g' \
      -e 's/^\[perf\]/perf:/g' \
      "$COMMIT_MSG_FILE"
    ;;
  *)
    sed -i \
      -e 's/^\[add\]/feat:/g' \
      -e 's/^\[fix\]/fix:/g' \
      -e 's/^\[update\]/fix:/g' \
      -e 's/^\[delete\]/chore:/g' \
      -e 's/^\[refactor\]/refactor:/g' \
      -e 's/^\[perf\]/perf:/g' \
      "$COMMIT_MSG_FILE"
    ;;
esac
