@echo off
title IQRA Beauty Parlour - Mobile Server
cls
echo =====================================================================
echo           IQRA BEAUTY PARLOUR - MOBILE CONNECTION SERVER
echo =====================================================================
echo.
echo Make sure your mobile phone and this PC are connected to the
echo SAME Wi-Fi network.
echo.
echo ---------------------------------------------------------------------
echo ACCESS URL FOR YOUR PHONE:
powershell -Command "$ip = (Get-NetIPAddress -AddressFamily IPv4 | Where-Object { $_.IPAddress -notlike '127.*' -and $_.IPAddress -notlike '169.254.*' } | Select-Object -First 1).IPAddress; Write-Host ' >>>  http://' + $ip + ':8000  <<<' -ForegroundColor Yellow"
echo ---------------------------------------------------------------------
echo.
echo Starting server on port 8000...
echo Keep this window open. Press Ctrl+C here when you want to stop.
echo.
python -m http.server 8000
pause
