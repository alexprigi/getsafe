import React from 'react'
import logo from './logo.svg'
import './App.css'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import Buyflow, { ProductIds } from './screens/buyflow/Buyflow'
import { ROUTES } from "./navigation/routes";

const containerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "center"
}
const itemStyle: React.CSSProperties = {
  padding: "36px"
}

const App = () => {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <Switch>

          <Route path={ROUTES.BUY_INS_DEV}>
            <Buyflow productId={ProductIds.devIns} />
          </Route>

          <Route path={ROUTES.BUY_INS_DESIGNR}>
            <Buyflow productId={ProductIds.desigrIns} />
          </Route>

          <Route path="/">
            <p>Welcome to Getsafe's Employee Insurance</p>

            <div style={containerStyle}>
              <div style={itemStyle}>
                <p>Are you a Developer?</p>
                <Link data-testid="dev-link" to={ROUTES.BUY_INS_DEV}>Get started my dear Developer!</Link>
              </div>

              <div style={itemStyle}>
                <p>Are you a Designer?</p>
                <Link  data-testid="designr-link"  to={ROUTES.BUY_INS_DESIGNR}>Get started my dear Designer!</Link>
              </div>
            </div>
          </Route>

        </Switch>
      </div>
    </Router>
  )
}

export default App
