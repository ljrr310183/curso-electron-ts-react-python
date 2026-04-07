# Electron + React + TypeScript App

Aplicación de escritorio multiplataforma construida con Electron, React y TypeScript.

## Stack

- **Electron** - Framework de escritorio
- **React 19** - UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool (electron-vite)
- **electron-builder** - Empaquetado
- **electron-updater** - Actualizaciones automáticas
- **ESLint + Prettier** - Code quality

## Getting Started

```bash
# Instalar dependencias
npm install

# Modo desarrollo
npm run dev

# Build producción
npm run build:win
npm run build:mac
npm run build:linux
```

## Scripts

| Comando               | Descripción                |
| --------------------- | -------------------------- |
| `npm run dev`         | Iniciar en modo desarrollo |
| `npm run build`       | Compilar para producción   |
| `npm run build:win`   | Crear .exe para Windows    |
| `npm run build:mac`   | Crear .app para macOS      |
| `npm run build:linux` | Crear AppImage para Linux  |
| `npm run lint`        | Ejecutar ESLint y Prettier |
| `npm run typecheck`   | Verificar tipos TypeScript |

## Estructura

```
src/
├── main/        # Proceso principal (Electron)
├── preload/     # preload scripts
└── renderer/    # React app (UI)
```

## Publicar Release

### Pre-requisitos

1. Tener tokens de GitHub configurados:
   - `GH_TOKEN` (con scope `repo`)
2. Configurar en `electron-builder.yml`:
   - `publish.owner` - Tu usuario/organización
   - `publish.repo` - Nombre del repositorio

### Pasos

```bash
# 1. Actualizar versión en package.json
npm version patch  # patch: 1.0.0 -> 1.0.1
npm version minor  # minor: 1.0.0 -> 1.1.0
npm version major  # major: 1.0.0 -> 2.0.0

# 2. Compilar y publicar
npm run build:win

# 3. Crear tag Git y push
git tag v1.0.1
git push origin main --tags
```

El workflow de GitHub Actions (`.github/workflows/release.yml`) detectará el tag y subirá el release a GitHub automáticamente.
