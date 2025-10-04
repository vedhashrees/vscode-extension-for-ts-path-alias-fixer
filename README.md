# TS Path Alias Fixer

A Visual Studio Code extension to automatically fix and replace relative TypeScript import paths with your configured custom path aliases.

---

## ✨ Features

- Replaces relative import paths (e.g., `../../../utils`) with clean aliases like `@utils`.
- Reads your preferred alias and base directory from VS Code settings.
- Runs silently in the background—no terminal required.
- Quick and easy command: `TS Path Alias Fixer`.

---

## 📦 Installation

Search for `ts_path_alias_fixer` in the [VS Code Marketplace](https://marketplace.visualstudio.com/) or install via the command line:

```bash
ext install vedhashrees.ts_path_alias_fixer
```

---

## 🚀 Usage

1. Open a TypeScript project with alias paths configured in `tsconfig.json`.
2. Press `Ctrl + Shift + P` (or `Cmd + Shift + P` on macOS).
3. Open User Settings, search for `TS Path Alias Fixer` , click on Entensions --> TS Path Alias Fixer and configure `alias` and `base` with the right values based on your `paths` config defined in `tsconfig.json` file
4. Press `Ctrl + Shift + P` (or `Cmd + Shift + P` on macOS) again.
5. Run the command: `TS Path Alias Fixer`.
6. All relative imports will be replaced with your alias based on settings.

---

## ⚙️ Extension Settings

You can configure the extension via your workspace or user settings:

```json
{
  "ts_path_alias_fixer.alias": "@",
  "ts_path_alias_fixer.base": "src"
}
```

| Setting                     | Type   | Default | Description                                                            |
| --------------------------- | ------ | ------- | ---------------------------------------------------------------------- |
| `ts_path_alias_fixer.alias` | string | `@`     | The alias used in your imports (e.g., `@`, `@utils`,`@services`, etc.) |
| `ts_path_alias_fixer.base`  | string | `src`   | The base folder in your project matching your tsconfig paths.          |

These settings should match your `tsconfig.json` paths configuration.

---

## 📁 Example

Given this import:

```ts
import { myFunc } from "../../../../utils/myFunc";
```

With the following settings:

```json
{
  "ts_path_alias_fixer.alias": "@",
  "ts_path_alias_fixer.base": "src"
}
```

And `tsconfig.json` path alias:

```json
"paths": {
  "@/*": ["src/*"]
}
```

It will be converted to:

```ts
import { myFunc } from "@/utils/myFunc";
```

## 📁 Example 2

Given this import:

```ts
import { myFunc } from "../../../../utils/myFunc";
```

With the following settings:

```json
{
  "ts_path_alias_fixer.alias": "@utils",
  "ts_path_alias_fixer.base": "src/"
}
```

And `tsconfig.json` path alias:

```json
"paths": {
  "@/*": ["src/*"],
  "@utils/*": ["src/utils/*"]
}
```

It will be converted to:

```ts
import { myFunc } from "@utils/myFunc";
```

## 📁 Example 3

Given this import:

```ts
import { myFunc } from "../../../../lib/apiClient/services/myFunc";
```

With the following settings:

```json
{
  "ts_path_alias_fixer.alias": "@services",
  "ts_path_alias_fixer.base": "src/lib/apiClient/services"
}
```

And `tsconfig.json` path alias:

```json
"paths": {
  "@/*": ["src/*"],
  "@utils/*": ["src/utils/*"],
  "@services/*": ["src/lib/apiClient/services/*"],
}
```

It will be converted to:

```ts
import { myFunc } from "@services/myFunc";
```

---

## 🛠 Requirements

- Node.js ≥ 14
- `ts-path-alias-fixer` npm package should be installed as dev dependency for this extension to work.
- if the package is not yet installed, the extension will request user if it can install on their behalf for it to fix the imports with `Yes` or `No` options. Choose `Yes` and the extension will automatically do it for you and modify your relative path imports in your files with your custom alias in the project

> You can install the npm globally or make sure it's installed as a dev dependency:

```bash
npm install --save-dev ts-path-alias-fixer
```

---

## 🧪 Development

To test or contribute:

```bash
git clone https://github.com/vedhashrees/vscode-extension-for-ts-path-alias-fixer
code .
```

Then press `F5` in VS Code to launch an Extension Development Host.

---

## 📄 License

[MIT](LICENSE)

---

## 🙌 Credits

Built using:

- [VS Code Extension API](https://code.visualstudio.com/api)
- [ts-path-alias-fixer](https://www.npmjs.com/package/ts-path-alias-fixer)

---

## 💡 Feedback & Issues

If you find a bug or want a feature, open an issue on GitHub or leave a review on the marketplace. Your feedback is welcome!
