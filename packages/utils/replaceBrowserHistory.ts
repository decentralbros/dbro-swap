import isUndefinedOrNull from './isUndefinedOrNull'

const replaceBrowserHistory = (key: string, value?: string | number | null) => {
  const url = new URL(window.location.href)
  if (isUndefinedOrNull(value)) {
    url.searchParams.delete(key)
  } else {
    url.searchParams.set(key, String(value))
  }
  const urlString = url.toString()
  window.history.replaceState({ ...window.history.state, as: urlString, url: urlString }, '', url)
  window.dispatchEvent(new Event('popstate#pcs'))
}

export default replaceBrowserHistory
