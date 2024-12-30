REM filepath: /C:/wamp64/www/projet-la-grimpette/CLICK-HERE.bat
@echo off

REM Ouvrir la première fenêtre CMD et exécuter npm i && npm run dev
start cmd /k "cd frontend\backoffice && npm i && npm run dev"

REM Ouvrir la deuxième fenêtre CMD, exécuter le site front
start cmd /c "cd frontend\site_vitrine && npx http-server -p 8080"

REM Ouvrir la deuxième fenêtre CMD, exécuter les commandes et fermer la fenêtre
start cmd /c "cd frontend\site_vitrine && start "" "http://localhost:8080/" && start "" "http://localhost:5173/" && exit"