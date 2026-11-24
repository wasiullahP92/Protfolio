@echo off
title Wasi Ullah Portfolio Launcher
echo ==========================================================
echo        Wasi Ullah - WordPress Developer & Web Designer
echo ==========================================================
echo.
echo Starting Frontend and Backend servers...
echo.

start "Vite Frontend (Port 5173)" cmd /c "npm run dev"
start "Node.js Backend (Port 5000)" cmd /c "node server/server.js"

echo Waiting 3 seconds for servers to initialize...
timeout /t 3 >nul

echo Opening browser at http://localhost:5173 ...
start http://localhost:5173

echo.
echo ==========================================================
echo Portfolio is running!
echo Main Website:     http://localhost:5173
echo Admin Dashboard:  http://localhost:5173/admin
echo Backend API:      http://localhost:5000/api
echo ==========================================================
echo.
pause

