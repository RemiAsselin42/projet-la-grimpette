REM filepath: /C:/wamp64/www/projet-la-grimpette/CLICK-HERE.bat
@echo off

REM Vérifier si Node.js est installé
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo Node.js n'est pas installe sur cet ordinateur.
    echo Veuillez installer Node.js depuis https://nodejs.org/
    pause
    exit /b 1
)

REM Ouvrir la première fenêtre CMD et exécuter le site backoffice
start cmd /k "cd frontend\backoffice && npm i && npm run dev"

REM Ouvrir la deuxième fenêtre CMD et exécuter le site front
start cmd /c "cd frontend\site_vitrine && npx http-server -p 8080 -y"

REM Ouvrir la deuxième fenêtre CMD, ouvrir les sites et le code du projet
start cmd /c "start "" "http://localhost:5173/" && start "" "http://localhost:8080/" && code . && exit"