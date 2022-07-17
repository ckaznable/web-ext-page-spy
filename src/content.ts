import { EXEC, CATCH, SOURCE } from "./constant"
import verify from "./verify"

async function mission(method: string, param: any) {
  return new Promise((resolve) => {
    window.addEventListener("message", (res) => {
      if(!verify(res, method)) {
        return
      }

      resolve(res.data.result)
    })
    window.postMessage({method, param, source: SOURCE}, "*")
  })
}

export async function exec(code: string) {
  return await mission(EXEC, {code})
}

export async function get(variable: string) {
  return await mission(CATCH, {variable})
}
