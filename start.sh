#!/bin/bash
set -e

# 1. Install uv
echo "Installing uv..."
curl -Ls https://astral.sh/uv/install.sh | bash

# Path where Render installs uv
UV_BIN="/opt/render/.local/bin/uv"

# 2. Create virtual environment
echo "Creating virtual environment..."
$UV_BIN venv .venv

# 3. Activate virtual environment
echo "Activating virtual environment..."
source .venv/bin/activate

# 4. Install dependencies using uv sync
echo "Installing dependencies with uv..."
$UV_BIN sync