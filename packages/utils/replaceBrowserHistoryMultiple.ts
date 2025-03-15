import isUndefinedOrNull from './isUndefinedOrNull'

const replaceBrowserHistoryMultiple = (params: { [key: string]: string | number | null | undefined }) => {
  const url = new URL(window.location.href)

  Object.entries(params).forEach(([key, value]) => {
    if (isUndefinedOrNull(value)) {
      url.searchParams.delete(key)
    } else {
      url.searchParams.set(key, String(value))
    }
  })

  const urlString = url.toString()
  window.history.replaceState({ ...window.history.state, as: urlString, url: urlString }, '', url)
  window.dispatchEvent(new Event('popstate#pcs'))
}

export default replaceBrowserHistoryMultiple
