const core = require('@actions/core');
// const github = require('@actions/github');
const exec = require("@actions/exec");
// 'aix', 'darwin', 'freebsd', 'linux', 'openbsd', 'sunos', and 'win32'.
const os = require('os');

async function body(){
  try {
    const oldStringRegex = core.getInput('oldString', {required : true});
    let oldStringWin = core.getInput('oldStringWin');
    let oldStringLinux = core.getInput('oldStringLinux');
    if(oldStringWin == ''){
      oldStringWin = oldStringRegex;
    }
    if(oldStringLinux == ''){
      oldStringLinux = oldStringRegex;
    }
    const newString = core.getInput('newString', {required : true});
    let newStringWin = core.getInput('newStringWin');
    let newStringLinux = core.getInput('newStringLinux');
    if(newStringWin == 'nullForStringInAction'){
      newStringWin = newString;
    }
    if(newStringLinux == 'nullForStringInAction'){
      newStringLinux = newString;
    }
    if(core.getBooleanInput('escapeBackslash')){
      newStringWin = newStringWin.replaceAll("\\", "\\\\");
      newStringLinux = newStringLinux.replaceAll("\\", "/");
    }
    const filePath = core.getInput('path', {required : true});
    const showFileContent = core.getBooleanInput('showFileContent');
    
    const regexOptions = core.getInput('regexOptions');
    let command = "";
    const platform = os.platform()
    if(platform == "linux"){
      core.info(`replace ${oldStringLinux} to ${newStringLinux} in ${filePath}`);
      command = `bash -c "sed -i 's|${oldStringLinux}|${newStringLinux}|${regexOptions}' '${filePath}'"`.toString();
    }else if(platform == "win32"){
      core.info(`replace ${oldStringWin} to ${newStringWin} in ${filePath}`);
      command = `powershell -Command "(Get-Content ${filePath}) -replace '${oldStringWin}', '${newStringWin}' | Set-Content -encoding ASCII ${filePath}"`.toString();
    }else{
        core.setFailed("Unsupported os " + platform);
    }  
    core.info(`run ${command}`);
    const error_code = await exec.exec(command);
    if(error_code != 0){
      core.setFailed(`Failed with error code ${error_code}`)
    }
    if(showFileContent){
      core.info("file content:");
      if(platform == "linux"){
        await exec.exec(`bash -c "cat ${filePath}"`.toString());
      }else if(platform == "win32"){
        await exec.exec(`powershell -Command "type ${filePath}"`.toString());
      }
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}
body();