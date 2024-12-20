@echo off
echo Starting Learning Tree Tuition Centre...

REM Check if node_modules exists, if not install dependencies
if not exist "node_modules\" (
    echo Installing dependencies...
    call pnpm install
)

REM Start the development server in the background
start /B pnpm dev

REM Wait a moment for the server to start
timeout /t 5 /nobreak

REM Open the default browser
start http://localhost:3000

pause
