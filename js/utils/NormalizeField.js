export default function(str) {
  return str
    .replace(/URL/, 'Url')
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, function(str){ return str.toUpperCase(); })
    .replace(/Url/, 'URL')
    .replace(/Og /, 'OpenGraph ')
}
