let storyx = (...ag) => {}

if (process.env.STORYBOOK == "development") {
  let { storiesOf, getStorybook } = require("@storybook/react")
  /*
import { ThemeProvider } from 'emotion-theming'
import theme from './theme';

const ThemeWrapper = ({children}) => (<ThemeProvider theme={theme}>
    {children}
    </ThemeProvider>)
*/

  const storyString = (parentPath: string): string => {
    let x: Array<string> = parentPath.split("/")
    let l = x.length - 1
    x[l] = x[l].split(".")[0] //basename
    for (let i = 0; i < l; i++) {
      if (x[i] == "components") return x.slice(i + 1).join("|")
    }
    throw new Error("bad path")
  }
  let importeds = {}
  storyx = obj => {
    let m: any = module
    //  console.log("obj", obj)
    let x = m.parents.length - 1
    while (m.parents[x] in importeds) {
      x--
    }
    if (x < 0) x = m.parents.length - 1
    let pname = m.parents[x]
    importeds[pname] = true
    let stories:any[] = []
    if (typeof obj == "function") {
      stories.push({ name: "default", obj })
    } else if (!("$$typeof" in obj)) {
      //asuming its a dict of react element
      for (let k in obj) {
        stories.push({ name: k, obj: obj[k] })
      }
    } else {
      stories.push({ name: "default", obj })
    }
    //  console.log("module.parents", m.parents)
    //  console.log("adding story for", pname, stories)
    let ret = storiesOf(storyString(pname), module)
    for (let x of stories) {
      //    console.log(x.obj, typeof x.obj == 'function');
      ret.add(x.name, typeof x.obj == "function" ? x.obj : () => x.obj)
    }
    delayedCallback(500, () => {
      importeds = {}
    })
    return ret
  }
}

let timeout:any = null
export const delayedCallback = (ms, cb) => {
  if (timeout) {
    clearTimeout(timeout)
  }
  timeout = setTimeout(() => {
    timeout = null
    cb()
  }, ms)
}

//export story = storyx;
export const story = storyx