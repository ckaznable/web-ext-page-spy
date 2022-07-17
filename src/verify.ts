import { SOURCE } from "./constant"

export default function(obj: any, method: string = "") {
  if(!obj) {
    return false
  }

  if(!obj.data || (obj.data && !obj.data.source)) {
    return false
  }

  if(obj.data.source !== SOURCE) {
    return false
  }

  if(!obj.data.method) {
    return false
  }

  if(method && obj.data.method !== `${method}_reply`) {
    return false
  }

  return true
}