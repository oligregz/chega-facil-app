#!/bin/bash

# Validate if .env.docker exists
if [ -f .env.docker ]; then
    # Copy .env.docker content for .env
    cp .env.docker .env
    echo ".env created by .env.docker"
else
    echo "Erro: .env.docker not found"
    exit 1
fi
