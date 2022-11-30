export default async () => {
  const workbox = await window.$workbox
  if (!workbox) {
    return
  }
  workbox.addEventListener('installed', (event) => {
    if (!event.isUpdate) {
      return
    }
    window.location.reload()
  })
}
