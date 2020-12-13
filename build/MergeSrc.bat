@echo off
set time_start=%time: =0%
echo ### NZYM BUILD START ###### %time_start%
echo Renaming current build for backup...
if not exist "backup" md backup
move nzym.js backup\
ren backup\nzym.js nzym-backup_%date:~10,4%%date:~4,2%%date:~7,2%_%time_start:~0,2%%time_start:~3,2%%time_start:~6,2%%time_start:~9,2%.js
echo Copying and merging src to build...
copy /b src\*.js nzym.js >nul
echo ### NZYM BUILD COMPLETE ### %time: =0%