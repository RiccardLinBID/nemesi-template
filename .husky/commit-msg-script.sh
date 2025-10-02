#!/bin/sh

COMMIT_MSG_FILE="$1"

# Controlla che il file esista
if [ -f "$COMMIT_MSG_FILE" ]; then
  # Windows-friendly / Linux / macOS
  unameOut="$(uname -s 2>/dev/null || echo Unknown)"
  case "${unameOut}" in
    Darwin*)
      sed -i '' \
        -e 's/^\[add\]/feat:/g' \
        -e 's/^\[fix\]/fix:/g' \
        -e 's/^\[update\]/chore:/g' \
        "$COMMIT_MSG_FILE"
      ;;
    *)
      sed -i \
        -e 's/^\[add\]/feat:/g' \
        -e 's/^\[fix\]/fix:/g' \
        -e 's/^\[update\]/chore:/g' \
        "$COMMIT_MSG_FILE"
      ;;
  esac
fi
