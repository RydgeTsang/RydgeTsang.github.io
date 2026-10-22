#!/bin/zsh
cd "${0:A:h}"
export PATH="/Users/rydge/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:$PATH"
if ! command -v node >/dev/null; then
  echo '请先安装 Node.js 22 或更新的 LTS 版本。'; read; exit 1
fi
if [[ ! -d node_modules ]]; then
  echo '请先按 README 安装依赖。'; read; exit 1
fi
open 'http://localhost:4321/keystatic'
node node_modules/astro/astro.js dev --host localhost
