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
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
function getAliasAndBaseFromTsconfig(workspacePath) {
    const tsconfigPath = path.join(workspacePath, "tsconfig.json");
    console.log("Looking for tsconfig at:", tsconfigPath);
    if (!fs.existsSync(tsconfigPath)) {
        console.log("tsconfig.json not found.");
        return {
            alias: null,
            base: null,
            possibleAlias: [],
            possibleBasePaths: [],
        };
    }
    try {
        const tsconfigRaw = fs.readFileSync(tsconfigPath, "utf8");
        const tsconfig = JSON.parse(tsconfigRaw);
        const compilerOptions = tsconfig.compilerOptions || {};
        const baseUrl = compilerOptions.baseUrl || null;
        console.log("baseUrl:", baseUrl);
        console.log("paths:", compilerOptions.paths);
        let possibleAlias = [];
        let possibleBasePaths = [];
        let alias = null;
        let baseP = null;
        const paths = compilerOptions.paths || {};
        for (const key in paths) {
            console.log("***********path key ::", key);
            if (key.endsWith("/*")) {
                alias = key.slice(0, -2); // Remove /* from end
                console.log("Detected alias:", alias);
                if (alias) {
                    possibleAlias.push(alias);
                }
                baseP = paths[key][0].slice(0, -2);
                if (baseP) {
                    possibleBasePaths.push(baseP);
                }
                //break; // Use first matching alias
            }
        }
        return { alias, base: baseUrl, possibleAlias, possibleBasePaths };
    }
    catch (err) {
        console.error("Failed to parse tsconfig.json:", err);
        return {
            alias: null,
            base: null,
            possibleAlias: [],
            possibleBasePaths: [],
        };
    }
}
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
        // The code you place here will be executed every time your command is executed
        // Display a message box to the user
        vscode.window.showInformationMessage("Ready to fix your imports with ts_path_alias_fixer!!");
        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (!workspaceFolders) {
            vscode.window.showErrorMessage("No workspace is open");
            return;
        }
        const workspacePath = workspaceFolders[0].uri.fsPath;
        const terminal = vscode.window.createTerminal(`Fix Path Aliases`);
        const config = vscode.workspace.getConfiguration("hellomyworld");
        const alias = config.get("alias", "@");
        const base = config.get("base", "src");
        const { alias: aliass, base: basee, possibleAlias, possibleBasePaths, } = getAliasAndBaseFromTsconfig(workspacePath);
        if (!possibleAlias || !possibleBasePaths) {
            vscode.window.showErrorMessage("Could not determine alias or base from tsconfig.json");
            return;
        }
        const alias = await vscode.window.showQuickPick(possibleAlias, {
            placeHolder: "Select an alias to use for imports",
        });
        if (!alias) {
            vscode.window.showErrorMessage("Alias selection canceled.");
            return;
        }
        const base = await vscode.window.showQuickPick(possibleBasePaths, {
            placeHolder: "Select a base path (baseUrl from tsconfig)",
        });
        if (!base) {
            vscode.window.showErrorMessage("Base path selection canceled.");
            return;
        }
        // const alias = await vscode.window.showInputBox({
        //   prompt: "Enter path alias (e.g. @, ~)",
        //   placeHolder: "@",
        //   value: "@",
        // });
        // if (!alias) {
        //   vscode.window.showErrorMessage("Alias is required.");
        //   return;
        // }
        // const base = await vscode.window.showInputBox({
        //   prompt: "Enter base path for alias (e.g. src, app)",
        //   placeHolder: "src",
        //   value: "src",
        // });
        // if (!base) {
        //   vscode.window.showErrorMessage("Base path is required.");
        //   return;
        // }
        console.log(`Selected alias is ${alias} and base is ${base}`);
        // You can customize these args or read them from settings
        const cmd = `npx fix-ts-imports --dir ./ --alias ${alias} --base ${base}`;
        terminal.sendText(cmd);
        terminal.show();
        vscode.window.showInformationMessage("Running ts-path-alias-fixer...");
    });
    context.subscriptions.push(disposable);
}
// This method is called when your extension is deactivated
function deactivate() { }
//# sourceMappingURL=backup.js.map