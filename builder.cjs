// builder.cjs
const { build } = require('electron-builder');
const { execSync } = require('child_process');
const path = require('path');

async function runBuild() {
  try {
    console.log('=== PASO 1: Compilando UI (React) ===');
    execSync('bun run build', { 
      cwd: process.cwd(), 
      stdio: 'inherit' 
    });
    
    console.log('=== PASO 2: Empaquetando con electron-builder ===');
    
    const target = process.argv[2] || 'current';
    const options = {
      config: {
        appId: 'com.alphabackendtest.app',
        productName: 'AlphaBackendTest',
        directories: {
          output: 'release',
          buildResources: 'build'
        },
        files: [
          'dist/**/*',
          'dist-electron/**/*',
          'package.json'
        ],
        extraMetadata: {
          main: 'dist-electron/main/main.cjs'
        },
        win: { target: 'nsis', icon: 'build/icon.ico' },
        mac: { target: 'dmg', icon: 'build/icon.icns' },
        linux: { target: 'AppImage', icon: 'build' },
        nsis: {
          oneClick: false,
          allowToChangeInstallationDirectory: true
        }
      }
    };

    if (target === 'win') options.config.win.target = ['nsis'];
    else if (target === 'mac') options.config.mac.target = ['dmg'];
    else if (target === 'linux') options.config.linux.target = ['AppImage'];

    await build(options);
    console.log('=== Build completado en carpeta release/ ===');
    
  } catch (error) {
    console.error('Error en build:', error);
    process.exit(1);
  }
}

runBuild();