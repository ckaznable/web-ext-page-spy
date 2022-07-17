import { EXEC, CATCH, SOURCE } from "./constant"
import verify from "./verify"

async function missionExec({code}: {code: string}) {
  const wrapCode = `
    window._spy_exec_result = (async () => {
      ${code}
    })()
  `

  eval(wrapCode)
  return new Promise(resolve => {
    setTimeout(() => {
      // @ts-ignore
      resolve(window._spy_exec_result)
    }, 100)
  })
}

async function missionCatch({variable}:{variable: string}={variable: ""}) {
  const group = (variable+"").split(".")
  return group.reduce((acc, key) => (!acc ? undefined : acc[key]), window)
}

async function handle(e: MessageEvent) {
  if(!verify(e)) {
    return
  }

  const {method, param} = e.data
  let process: (d?: any)=>Promise<any> = async () => {}
  switch(method) {
    case CATCH:
      process = missionCatch
      break
    case EXEC:
      process = missionExec
      break
  }
  const result = await process(param)

  // @ts-ignore
  ;(window || window.parent).postMessage({method: `${method}_reply`, result, source: SOURCE}, "*")
}

export function inject() {
  // keep listener install in once
  window.removeEventListener("message", handle)
  // listen message event
  window.addEventListener("message", handle)
}
