# alphabackendtest

Aplicación de escritorio con Electron + React + TypeScript + Vite

## 🧩 Descripción

Proyecto base preconfigurado con:
- Electron 41.1.1
- React 19.2.4, React DOM 19.2.4
- TypeScript 5.9.3
- Vite 8.0.1
- electron-vite 5.0.0
- Bun como gestor de paquetes

UI inicial: "Iniciando Proyecto con React".

## 📁 Estructura de carpetas

- `electron/`
  - `main.ts` -> Configura `BrowserWindow` y carga URL de dev o `dist/index.html` en producción.
  - `preload.ts` -> `contextBridge` con API segura `electronApi`.
  - `types/electron-api.ts` -> Interfaz IPC segura (`sendMessage` / `onMessage`).
- `src/`
  - `App.tsx` -> Componente principal React.
  - `main.tsx` -> Renderiza React en DOM.
  - `types/electron.d.ts` -> Tipado global de `window.electronApi`.
- `electron.vite.config.ts` -> Build de `main.cjs`, `preload.cjs` y renderer React.
- `vite.config.ts` -> Build renderer React.
- `index.html` -> Entrada Vite.
- `package.json` -> `main` apunta a `dist-electron/main/main.cjs`.

## 🚀 Ejecutar en desarrollo

1. Instalar dependencias

```bash
bun install
```

2. Iniciar modo dev con HMR

```bash
bun run dev
```

3. Abrir la app, se lanza electron y se conecta a `http://localhost:5173/`.

## 🏗️ Construir para producción

```bash
bun run build
```

Esto genera:
- `dist-electron/main/main.cjs`
- `dist-electron/preload/preload.cjs`
- `dist` (renderer estático)

## ▶️ Previsualizar producción local

```bash
bun run preview
```

## 🔐 Configuración de seguridad Electron

En `electron/main.ts` se mantiene:
- `nodeIntegration: false`
- `contextIsolation: true`
- `preload` requerido (`path.join(__dirname, '../preload/preload.cjs')`)

## 🔄 Comunicación IPC (TypeScript + seguridad)

- Renderer → Main (mando mensaje):

```ts
window.electronApi.sendMessage('channel', payload)
```

- Main → Renderer (escucha mensaje):

```ts
window.electronApi.onMessage('channel', callback)
```

La interfaz `electron-api.ts` define:
- `sendMessage(channel: string, data?: any): void`
- `onMessage(channel: string, callback: (data: any)=>void): void`

## 🛠️ Scripts disponibles (package.json)

- `dev`: desarrollo (HMR + electron)
- `build`: producción
- `preview`: servir app prod local

## 📝 Recomendaciones futuras

- Añadir validación de canales IPC estricta con tipos literales.
- Integrar preload API extends para servicios (ej. `ipcRenderer.invoke`).
- Añadir lint/format con `bun add -d eslint prettier` y config extendida.

---

### 🧪 Comprobación inicial

- Página carga `Iniciando Proyecto con React`.
- IPC inicial funciona: Renderer puede mandar y recibir mensajes.
- Dev con hot reload activo.

---

### 👤 Autor

`alphabackendtest` - Setup inicial listo para implementar features.