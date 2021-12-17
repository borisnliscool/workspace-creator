// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const fs = require('fs');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    let disposable = vscode.commands.registerCommand('workspace-creator.createworkspace', function () { // log the current workspace
        let path = vscode.workspace.rootPath;
		
		if(path == undefined){
			vscode.window.showErrorMessage("Please open a workspace first!");
			return;
		}

        // create a new folder
        try {
            fs.mkdirSync(`${path}/css`);
            vscode.window.showInformationMessage(`Created folder ${path}/css`);
        } catch (e) {
            console.error(e);
        }

        try {
            fs.mkdirSync(`${path}/js`);
            vscode.window.showInformationMessage(`Created folder ${path}/js`);
        } catch (e) {
            console.error(e);
        }

        try {
            fs.accessSync(`${path}/css/style.css`, fs.constants.F_OK);
        } catch (e) {
            fs.writeFileSync(`${path}/css/style.css`, 'body { \n\tmargin: 0; \n\tpadding: 0; \n}');
            vscode.window.showInformationMessage(`Created file ${path}/css/style.css`);
        }

        try {
            fs.accessSync(`${path}/js/main.js`, fs.constants.F_OK);
        } catch (e) {
            fs.writeFileSync(`${path}/js/main.js`, '// This is a basic JavaScript file. You should change this!\nconsole.log("Hello World!");');
            vscode.window.showInformationMessage(`Created file ${path}/js/main.js`);
        }

        try {
            fs.accessSync(`${path}/index.html`, fs.constants.F_OK);
        } catch (e) {
            fs.writeFileSync(`${path}/index.html`, "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n\t<meta charset=\"UTF-8\">\n\t<meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\n\t<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n\t<title>Document</title>\n\t<!-- Link the CSS stylesheet -->\n\t<link rel=\"stylesheet\" href=\"css/style.css\">\n</head>\n<body>\n\t\n\t\n\t<!-- Link the JavaScript file -->\n\t<script src=\"js/main.js\"></script>\n</body>\n</html>");
            vscode.window.showInformationMessage(`Created file ${path}/index.html`);
        }

        vscode.window.showInformationMessage(`Created workspace in "${path}"`);
        vscode.workspace.openTextDocument(`${path}/index.html`).then(doc => {
            vscode.window.showTextDocument(doc);
        });
    });

    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
    activate,
    deactivate
}
