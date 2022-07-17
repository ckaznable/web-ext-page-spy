import { get, exec } from "web-ext-page-spy"

(() => {
  const injectPath = chrome.runtime.getURL("script/inject.js")
  const script = document.createElement("script")
  script.src = injectPath
  document.body.append(script)

  setTimeout(async () => {
    const url = await get("location.href")
    console.log(`url: ${url}`)

    exec(`
      var dom = document.querySelector(".gLFyf.gsfi")
      if(dom) {
        dom.value = "web-ext-page-spy test"
      }
    `)
  }, 100)
})()