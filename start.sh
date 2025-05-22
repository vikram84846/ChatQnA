#!/bin/bash

# Exit on error
set -e

# 1. Install uv (if not already installed)
echo "Installing uv..."
curl -Ls https://astral.sh/uv/install.sh | bash

# Add uv to PATH (modify this path if needed based on where uv is installed)
export PATH="$HOME/.cargo/bin:$PATH"

# 2. Set up virtual environment (called `.venv` here)
echo "Creating virtual environment..."
uv venv .venv

# 3. Activate virtual environment
echo "Activating virtual environment..."
source .venv/bin/activate

# 4. Install dependencies using uv sync
echo "Syncing dependencies from pyproject.toml..."
uv sync

# 5. Run FastAPI app using uvicorn
echo "Starting FastAPI app..."
uvicorn main:app --reload --host 0.0.0.0 --port 8000
