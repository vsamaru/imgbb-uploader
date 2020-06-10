import React, { Children, CSSProperties } from "react"
const useMediaQuery = require("@material-ui/core/useMediaQuery").default
export const Grid = require("@material-ui/core/Grid").default
const BoxOld = require("@material-ui/core/Box").default
export const Button = require("@material-ui/core/Button").default
export const Container = require("@material-ui/core/Container").default
export const Avatar = require("@material-ui/core/Avatar").default
export const Hidden = require("@material-ui/core/Hidden").default
export const IconButton = require("@material-ui/core/IconButton").default
export const Menu = require("@material-ui/core/Menu").default
export const Popover = require("@material-ui/core/Popover").default
export const Tabs = require("@material-ui/core/Tabs").default
export const Tab = require("@material-ui/core/Tab").default
export const ButtonBase = require("@material-ui/core/ButtonBase").default
export const Paper = require("@material-ui/core/Paper").default
export const Chip = require("@material-ui/core/Chip").default
export const { makeStyles } = require("@material-ui/core/styles")
export const {
  ThemeProvider,
  createMuiTheme,
} = require("@material-ui/core/styles")
export const TextField = require("@material-ui/core/TextField").default
export const LinearProgress = require("@material-ui/core/LinearProgress")
  .default

export const Table = require("@material-ui/core/Table").default
export const TableBody = require("@material-ui/core/TableBody").default
export const TableCell = require("@material-ui/core/TableCell").default
export const TableContainer = require("@material-ui/core/TableContainer")
  .default
export const TableHead = require("@material-ui/core/TableHead").default
export const TableRow = require("@material-ui/core/TableRow").default
export const { createStyles, withStyles } = require("@material-ui/core/styles")
export const Switch = require("@material-ui/core/Switch").default
export const Divider = require("@material-ui/core/Divider").default
type Theme = {
  [key: string]: any
}

export type BoxProps = {
  style?: CSSProperties
  [key: string]: any
}

const breakpoints = {
  sm: "600px",
  md: "960px",
  lg: "1280px",
  xl: "1920px",
}

export const Rect = ({h = "50px",w = "100%"}:{h?:string, w?:string}) => {
  return (<div style={{height:h, width:w,backgroundColor:'#C4C4C4', margin:'1px'}}></div>)
}

export const Box = ({
  children,
  align = null,
  alignItems = null,
  justifyContent = null,
  justify = null,
  uppercase = null,
  style,
  ...props
}: BoxProps) => {
  return (
    <BoxOld
      alignItems={align ? align : alignItems}
      justifyContent={justify ? justify : justifyContent}
      style={{ textTransform: uppercase ? "uppercase" : null, ...style }}
      {...props}
    >
      {children}
    </BoxOld>
  )
}
interface BoxHoriProps extends BoxProps {
  breakOn?: "sm" | "md" | "lg" | "xl"
}

export const stylesHori = (theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "row",
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
      },
    },
  })
export const BoxHori = ({
  children,
  breakOn = "md",
  ...props
}: BoxHoriProps) => {
  const breaked = useMediaQuery(`(max-width:${breakpoints[breakOn]})`)
  return (
    <Box
      {...props}
      display="flex"
      style={breaked ? { flexDirection: "column" } : { flexDirection: "row" }}
    >
      {children}
    </Box>
  )
}

export const stylesVert = (theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
      [theme.breakpoints.down("sm")]: {
        flexDirection: "row",
      },
    },
  })

export const BoxVert = withStyles(stylesVert)(
  ({ children, ...props }: BoxHoriProps) => {
    return <Box {...props}>{children}</Box>
  }
)

interface BoxContProps extends BoxProps {
  size?: "sm" | "md" | "lg" | "xl"
}

export const BoxCont = ({ children, size = "md", ...props }: BoxContProps) => {
  return (
    <Boxf width="100%" height="100%" justifyContent="center">
      <Box flex={1} maxWidth={breakpoints[size]} {...props}>
        {children}
      </Box>
    </Boxf>
  )
}

interface HProps extends BoxProps {
  noWrap?: boolean
  as?: string
}

export const useStyles = makeStyles({
  root: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: 48,
    padding: "0 30px",
  },
})

export const Box2 = ({ jss, children, ...props }) => {
  return (
    <Box className={jss && jss} {...props}>
      {children}
    </Box>
  )
}

export const H: React.FC<HProps> = ({ children, as, noWrap, ...props }) => {
  return (
    <Box
      fontSize={"16px"}
      fontWeight="bold"
      whiteSpace={noWrap && "nowrap"}
      overflow={noWrap && "hidden"}
      textOverflow={noWrap && "ellipsis"}
      color="inherit"
      {...props}
    >
      {children}
    </Box>
  )
}

const jss = (key, style) => {
  let x = jss as any
  if (!x.keys) x.keys = {}
  if (!(key in x.keys)) {
    const o = makeStyles({ x: style })()
    const k = Object.keys(o)[0]
    x.keys[key] = k
  }
  return x.keys[key]
}

export const H4: React.FC<HProps & {}> = ({ children, ...props }) => {
  return (
    <H component="h4" fontSize={"16px"} fontWeight="bold" {...props}>
      {children}
    </H>
  )
}

export const H3: React.FC<HProps & {}> = ({ children, ...props }) => {
  return (
    <H component="h3" fontSize={"20px"} fontWeight="bold" {...props}>
      {children}
    </H>
  )
}

export const H2: React.FC<HProps & {}> = ({ children, ...props }) => {
  return (
    <H component="h2" fontSize={"24px"} fontWeight="bold" {...props}>
      {children}
    </H>
  )
}

export const H1: React.FC<HProps & {}> = ({ children, ...props }) => {
  return (
    <H component="h1" fontSize={"32px"} fontWeight="bold" {...props}>
      {children}
    </H>
  )
}

export const Txt: React.FC<BoxProps & {}> = ({ children, ...props }) => {
  return (
    <Box component="span" color="inherit" {...props}>
      {children}
    </Box>
  )
}

export const Boxf: React.FC<BoxProps & {}> = ({ children, ...props }) => {
  //console.log('got',Box);
  return (
    <Box display="flex" {...props}>
      {children}
    </Box>
  )
}

export const Boxfc: React.FC<BoxProps & {}> = ({ children, ...props }) => {
  return (
    <Box display="flex" flexDirection="column" {...props}>
      {children}
    </Box>
  )
}

export const BoxPaper: React.FC<BoxProps & {}> = ({
  children,
  elevation = null,
  stylePaper = null,
  ...props
}) => {
  return (
    <Box {...props}>
      <Paper
        style={{
          width: "100%",
          backgroundColor: "inherit",
          ...(stylePaper ? stylePaper : {}),
        }}
        elevation={elevation}
      >
        {children}
      </Paper>
    </Box>
  )
}

export const Content: React.FC<BoxProps & {}> = ({ children, ...props }) => {
  return (
    <Box className="content" {...props}>
      {children}
    </Box>
  )
}

let _cb = {}
export function callAfterMs(
  duration: number,
  fn: any,
  key: string = "default"
): void {
  if (key in _cb) {
    clearTimeout(_cb[key])
  }
  _cb[key] = setTimeout(() => {
    delete _cb[key]
    fn()
  }, duration)
}

export const Touchable = ({ children, ...props }) => {
  return (
    <div style={{ cursor: "pointer" }} {...props}>
      {children}
    </div>
  )
}
