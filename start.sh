#!/bin/bash
set -e

# Add uv to PATH (Render installs it here)
export PATH="/opt/render/.local/bin:$PATH"

# 1. Install uv
echo "Installing uv..."
curl -Ls https://astral.sh/uv/install.sh | bash

# 2. Create virtual environment
echo "Creating virtual environment..."
uv venv .venv

# 3. Activate virtual environment
echo "Activating virtual environment..."
source .venv/bin/activate

# 4. Install dependencies using uv sync
echo "Installing dependencies with uv..."
uv sync

# 5. Start FastAPI app
echo "Starting FastAPI app..."
uvicorn main:app --reload --host 0.0.0.0 --port $PORT
