@echo off
title Wasi Ullah Portfolio - Frontend & Backend Launcher
color 0b

echo ========================================================
echo   WASI ULLAH - FULL STACK PORTFOLIO RUNNER
echo ========================================================
echo.
echo [1/3] Checking Node.js installation...
where node >nul 2>&1
if %ERRORLEVEL% neq 0 (
    echo [ERROR] Node.js is not found in your PATH!
    echo Please install Node.js from https://nodejs.org
    pause
    exit /b 1
)

echo [2/3] Starting Backend (Port 5000) and Frontend (Port 5173)...
echo.
echo Both servers are launching concurrently.
echo - Portfolio Website: http://localhost:5173
echo - Admin Panel:       http://localhost:5173/admin
echo - Backend API:       http://localhost:5000/api/health
echo.
echo (Keep this terminal window open while working or previewing!)
echo ========================================================
echo.

npm run dev:all

pause
