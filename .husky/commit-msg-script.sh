#!/bin/sh

COMMIT_MSG_FILE="$1"

# Controlla che il file esista
if [ -f "$COMMIT_MSG_FILE" ]; then
  # Windows-friendly / Linux / macOS
  unameOut="$(uname -s 2>/dev/null || echo Unknown)"
  case "${unameOut}" in
    Darwin*)
      # macOS sed
      sed -i '' \
        -e 's/^\[add\]:/feat:/g' \
        -e 's/^\[chance\]:/chore:/g' \
        -e 's/^\[update\]:/chore:/g' \
        -e 's/^\[fix\]:/fix:/g' \
        "$COMMIT_MSG_FILE"
      ;;
    *)





      # Linux & Windows (Git Bash)
      sed -i \
        -e 's/^\[add\]:/feat:/g' \
        -e 's/^\[chance\]:/chore:/g' \
        -e 's/^\[update\]:/chore:/g' \
        -e 's/^\[fix\]:/fix:/g' \
        "$COMMIT_MSG_FILE"
      ;;
  esac
fi
