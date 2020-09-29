# Windows Hello - NodeRT Debugger
This is a small node.js routine intended to troubleshoot a lack of support, load errors, side-load module errors or other
general exceptions that may be occurring when attempting to enable or support Windows Hello from a machine that would
or should otherwise support it on Windows 10.

## Usage
Run the following:

```cmd
git clone git@github.com:cscharf/reproduce-win-hello-failure.git
cd reproduce-win-hello-failure
npm install
node index.js
```

## Notes
See: https://github.com/bitwarden/desktop/issues/558