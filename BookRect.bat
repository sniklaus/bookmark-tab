call AssetGen.bat

del BookRect.xpi

xcopy "%~dp0\content\jquery.js" "%~dp0\resources\bookrect\data\" /F /R /Y

"C:\Program Files\WinRAR\WinRAR.exe" a -afzip -r -x@"BookRect.txt" "BookRect.xpi" "*.*"

del "%~dp0\resources\bookrect\data\jquery.js"