# Replace text in filename
# Tested on Linux

import os

directory = '/home//user/Downloads/' # Directory where files are located
find = ".720p.WEB-DL.HEVC.x265-BONE" # Text in filename to replace
replace = ""                         # New text

fileList = os.listdir(directory)

for ii in fileList:
    newName = ii.replace(find,replace)
    if newName != ii:
        os.rename(directory+ii,directory+newName)