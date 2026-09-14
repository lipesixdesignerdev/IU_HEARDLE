require('./generate-db').validateCatalog(require('./catalog/catalog.json'));
const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, 'dist');
if (!fs.existsSync(distDir)) fs.mkdirSync(distDir);

let JavaScriptObfuscator = null;
try {
  JavaScriptObfuscator = require('javascript-obfuscator');
} catch (e) {
  console.warn('⚠️ javascript-obfuscator não encontrado, usando cópia simples para /dist/');
}

const OPTIONS = {
  compact: true,
  controlFlowFlattening: true,
  controlFlowFlatteningThreshold: 0.75,
  deadCodeInjection: true,
  deadCodeInjectionThreshold: 0.4,
  debugProtection: true,
  debugProtectionInterval: 4000,
  disableConsoleOutput: true,
  identifierNamesGenerator: 'hexadecimal',
  log: false,
  numbersToExpressions: true,
  renameGlobals: false,
  selfDefending: true,
  simplify: true,
  splitStrings: true,
  splitStringsChunkLength: 5,
  stringArray: true,
  stringArrayCallsTransform: true,
  stringArrayCallsTransformThreshold: 0.75,
  stringArrayEncoding: ['base64'],
  stringArrayIndexShift: true,
  stringArrayRotate: true,
  stringArrayShuffle: true,
  stringArrayWrappersCount: 3,
  stringArrayWrappersChainedCalls: true,
  stringArrayWrappersParametersMaxCount: 5,
  stringArrayWrappersType: 'function',
  stringArrayThreshold: 0.75,
  transformObjectKeys: true,
  unicodeEscapeSequence: false,
};

const files = ['guard.js', 'script.js', 'database.js'];

files.forEach(file => {
  const srcPath = path.join(__dirname, file);
  const outPath = path.join(distDir, file);
  const src = fs.readFileSync(srcPath, 'utf8');

  if (JavaScriptObfuscator) {
    try {
      const result = JavaScriptObfuscator.obfuscate(src, OPTIONS);
      fs.writeFileSync(outPath, result.getObfuscatedCode());
      const origSize = (src.length / 1024).toFixed(1);
      const newSize = (result.getObfuscatedCode().length / 1024).toFixed(1);
      console.log(`✅ ${file}: ${origSize}KB → ${newSize}KB (obfuscated)`);
      return;
    } catch (err) {
      console.warn(`⚠️ Erro ao ofuscar ${file}, copiando sem ofuscação:`, err.message);
    }
  }
  fs.writeFileSync(outPath, src);
  console.log(`✅ ${file}: Copiado para /dist/`);
});

console.log('\n🔒 Build concluído! Arquivos em /dist/');
