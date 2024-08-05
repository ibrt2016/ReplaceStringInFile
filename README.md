# ReplaceStringInFile action

This action replace string in file.  
It works on both Linux and Windows.  

This action uses `sed` in Linux and `powershell shell code` in Windows to replace.

## Inputs

### `path`
The path of the file.  
**Required**.  

### `oldString`
General `oldString` regex used both in Linux and Windows.
**Required**.  

### `oldStringWin`
`oldString` regex used in Windows OS. If this exist, action will use this one instead of general `oldString`.  

### `oldStringLinux`
`oldString` regex used in Linux OS. If this exist, action will use this one instead of general `oldString`.  

### `newString`
General `newString` used both in Linux and Windows.  
**Required** Default ''.  

### `newStringWin`
`newString` used in Windows OS. If this exist, action will use this one instead of general `newString`.  
Default: 'nullForStringInAction'.  

### `newStringLinux`
`newString` used in Linux OS. If this exist, action will use this one instead of general `newString`.  
Default: 'nullForStringInAction'.  

### `regexOptions`
Regex options.  
Default: 'g'.  

### `escapeBackslash`
Escape backslash ( \ -> \\\ in win and \ -> / ).  
Default: false  

### `showFileContent`
If it equal to ture, action will print out file content after replacement finished.

Action uses `cat` in Linux and `type` in Windows to print.

Default: false.

## Example usage
[test.yaml](.github/workflows/test.yaml)
```yaml
- name: replace
  uses: Nambers/ReplaceStringInFile@v1
  with:
    path: ${{ github.workspace }}/a.test
    oldString: abc123))
    oldStringWin: abc123\)\)
    newString: --_
    showFileContent: true
```
