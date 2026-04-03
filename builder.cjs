// builder.cjs
const { build } = require('electron-builder');
const { execSync } = require('child_process');

async function runBuild() {
  try {
    console.log('=== PASO 1: Compilando UI (React) ===');
    execSync('bun run build', { 
      cwd: process.cwd(), 
      stdio: 'inherit' 
    });
    
    console.log('=== PASO 2: Empaquetando con electron-builder ===');
    
    // 1. Capturar los argumentos correctamente
    const args = process.argv.slice(2);
    const target = args.find(arg => !arg.startsWith('--')) || 'current';
    const shouldPublish = args.includes('--publish'); // Detecta si viene --publish always
    
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

        // 2. INDICAR EL PROVEEDOR DE PUBLICACIÓN
        // Al agregar esto, electron-builder sabe que debe generar los archivos de actualización
        publish: {
          provider: 'github',
          releaseType: 'release' // Usa el número de versión literal como nombre del Release
        },

        win: { target: 'nsis', icon: 'build/icon.ico' },
        mac: { target: 'dmg', icon: 'build/icon.icns' },
        linux: { target: 'AppImage', icon: 'build' },
        
        nsis: {
          oneClick: false,
          allowToChangeInstallationDirectory: true,
          // 3. FORZAR LA GENERACIÓN DEL BLOCKMAP
          differentialPackage: true 
        }
      }
    };

    if (target === 'win') options.config.win.target = ['nsis'];
    else if (target === 'mac') options.config.mac.target = ['dmg'];
    else if (target === 'linux') options.config.linux.target = ['AppImage'];

    // 4. INYECTAR EL PUBLISH EN EL BUILD
    // Si venía --publish always desde el action, se lo pasamos a electron-builder
    if (shouldPublish) {
      options.publish = 'always';
    }

    await build(options);
    console.log('=== Build completado en carpeta release/ ===');
    
  } catch (error) {
    console.error('Error en build:', error);
    process.exit(1);
  }
}

runBuild();