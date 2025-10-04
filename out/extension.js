"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = __importStar(require("vscode"));
const child_process_1 = require("child_process");
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
function activate(context) {
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "ts_path_alias_fixer" is now active!');
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    const disposable = vscode.commands.registerCommand("ts_path_alias_fixer.fixTsImports", async () => {
        // Display a message box to the user
        vscode.window.showInformationMessage("Ready to fix your imports with ts_path_alias_fixer!!");
        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (!workspaceFolders) {
            vscode.window.showErrorMessage("No workspace is open");
            return;
        }
        const workspacePath = workspaceFolders[0].uri.fsPath;
        const config = vscode.workspace.getConfiguration("ts_path_alias_fixer");
        const alias = config.get("alias", "@");
        const base = config.get("base", "src");
        const runFixer = () => {
            // You can customize these args or read them from settings
            const cmd = `npx fix-ts-imports --dir ./ --alias ${alias} --base ${base}`;
            vscode.window.showInformationMessage("Running ts-path-alias-fixer...");
            (0, child_process_1.exec)(cmd, { cwd: workspacePath }, (error, stdout, stderr) => {
                if (error) {
                    console.error(`Error running fix-ts-imports: ${error.message}`);
                    vscode.window.showErrorMessage(`Error in fixing imports with custom path alias :  ${error.message}`);
                    return;
                }
                if (stderr) {
                    vscode.window.showErrorMessage(`Path aliases Fixer failed `);
                }
                vscode.window.showInformationMessage(`Path aliases fixed successfully!! \n${stdout}`);
            });
        };
        // Step 1: Try to check silently if fix-ts-imports is available
        (0, child_process_1.exec)("npx --no-install ts-path-alias-fixer@1.1.0 --version", { cwd: workspacePath }, async (error) => {
            if (error) {
                // Not installed
                const choice = await vscode.window.showWarningMessage("'ts-path-alias-fixer' is not installed. Install it as a devDependency?", "Yes", "No");
                if (choice === "Yes") {
                    vscode.window.showInformationMessage("Installing ts-path-alias-fixer@1.1.0...");
                    (0, child_process_1.exec)("npm install --save-dev ts-path-alias-fixer@1.1.0", { cwd: workspacePath }, (installErr, stdout, stderr) => {
                        if (installErr) {
                            vscode.window.showErrorMessage(`Installation failed: ${installErr.message}`);
                            return;
                        }
                        vscode.window.showInformationMessage("ts-path-alias-fixer installed successfully.");
                        runFixer();
                    });
                }
                else {
                    vscode.window.showWarningMessage("Cannot run fixer without 'ts-path-alias-fixer@1.1.0' installed.");
                }
            }
            else {
                // Installed, continue
                runFixer();
            }
        });
    });
    context.subscriptions.push(disposable);
}
// This method is called when your extension is deactivated
function deactivate() { }
//# sourceMappingURL=extension.js.map