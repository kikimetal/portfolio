import React from "react"
import { BrowserRouter, Link, Route, Switch } from "react-router-dom"
import { connect } from "react-redux"
// scroll animation
import { animateScroll } from "react-scroll"
// onSwipe onTap
import ReactTouchEvents from "react-touch-events"

// containers
import MyHelmet from "./MyHelmet"
import Home from "./Home"
import About from "./About"
import Products from "./Products"

// components
import NotFound from "../components/NotFound"
import Btn from "../components/Btn"
import KikiStar from "../components/KikiStar"
import Menu from "../components/Menu"

// transition
import { spring, AnimatedSwitch } from "react-router-transition"
// we need to map the `scale` prop we define below
// to the transform style property
function mapStyles(styles) {
  return {
    opacity: styles.opacity,
    transform: `scale(${styles.scale})`,
  };
}

// spring config 全ての値は数値(int)
// val: 到達する値
// stiffness: バネを引く強さ -> 高いほどスピードアップ
// damping: 抵抗力 -> 高いほどバウンドせず、強さに抗う -> スピードダウン

// custom spring creator
function bounce(val, override = {}) {
  return spring(val, {
    stiffness: 190,
    damping: 15,
    ...override,
  });
}
const bounceTransition = {
  // start in a transparent, upscaled state
  atEnter: {
    opacity: 0,
    scale: 1.2,
  },
  // leave in a transparent, downscaled state
  atLeave: {
    opacity: bounce(0, {stiffness: 97, damping: 34}),
    scale: bounce(0.8, {stiffness: 97, damping: 34}),
  },
  // and rest at an opaque, normally-scaled state
  atActive: {
    opacity: bounce(1),
    scale: bounce(1),
  },
};

class App extends React.Component{
  constructor(props) {
    super(props)
    this.toTop = this.toTop.bind(this)
    this.height100control = this.height100control.bind(this)
  }

  componentDidMount(){
    // this.height100control(true)
    this.props.setScreenWidth(window.innerWidth)
    window.addEventListener("resize", () => {
      // this.height100control()
      this.props.setScreenWidth(window.innerWidth)
    })
  }

  height100control(initial = false){
    const h = window.innerHeight + "px"
    let height100elements = document.getElementsByClassName("height100")
    height100elements = Array.from(height100elements)
    height100elements.forEach(elem => {
      elem.style.height = h
    })
    if (initial) {
      height100elements.forEach(elem => {
        elem.style.transition = "0.3s ease"
      })
    }
  }

  toTop(){
    animateScroll.scrollToTop({
      duration: window.pageYOffset / 2.6,
      smooth: "ease",
    })
  }

  render(){
    return (
      <div className="App">
        <MyHelmet />

        <main className="main height100">
          <nav className="nav">
            <Menu />
          </nav>
          <AnimatedSwitch
            atEnter={bounceTransition.atEnter}
            atLeave={bounceTransition.atLeave}
            atActive={bounceTransition.atActive}
            mapStyles={mapStyles}
            className="animated-switch-wrapper"
            >
            <Route exact path="/" component={Home} />
            <Route exact path="/about" component={About} />
            <Route path="/products" component={Products} />
            <Route component={NotFound} />
          </AnimatedSwitch>

        </main>
      </div>
    )
  }
}

const Footer = () => (
  <footer className="footer">
    <Btn onClick={this.toTop}>^^^ TOP ^^^</Btn>
    <br/>
    <small>Powered by KIKIMETAL.</small>
  </footer>
)

const Header = () => (
  <div>
    <h1><KikiStar spin={true}/></h1>
    <h1>Welcome kikimetal.com</h1>
    <p>This is HEADER.</p>
    <h2>please scroll down.</h2>

    <Switch>
      <Route exact path="/" render={() => <h1>Home</h1>} />
      <Route exact path="/about" render={() => <h1>About</h1>} />
      <Route path="/products" render={() => <h1>Products</h1>} />
    </Switch>
  </div>
)

import action from "../modules/action"

// const mapStateToProps = state => state // <- OK (router が入っているから)
const mapStateToProps = state => ({
  isScreenWidth: state.isScreenWidth,
  isShowTrigger: state.isShowTrigger,
  router: state.router, // <- 必須
  // ここで router を読み込まないと、react-router-transition が動作しない。
})
const mapStateToDispatch = dispatch => ({
  setScreenWidth: (width) => dispatch(action.setScreenWidth(width)),
  showTrigger: () => dispatch(action.showTrigger),
  hideTrigger: () => dispatch(action.hideTrigger),
})
export default connect(mapStateToProps, mapStateToDispatch)(App)