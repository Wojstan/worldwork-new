export function shortenText(text = '', limitBefore = 8, limitAfter = 3) {
  const first = text.slice(0, limitBefore)
  const last = limitAfter === 0 ? '' : text.slice(-limitAfter)
  return `${first}${text.length > limitBefore ? '...' : ''}${last}`
}
