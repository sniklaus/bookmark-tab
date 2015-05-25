call AssetGen.bat

xcopy "%~dp0\..\addon-sdk-bookrect\data\*" "%~dp0\resources\bookrect\data\" /E /I /F /R /Y
xcopy "%~dp0\..\addon-sdk-bookrect\lib\*" "%~dp0\resources\bookrect\lib\" /E /I /F /R /Y

del BookRect.xpi

"C:\Program Files\WinRAR\WinRAR.exe" a -afzip -r -x@"BookRect.txt" "BookRect.xpi" "*.*"

rmdir /s /q "%~dp0\resources"