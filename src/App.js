import React from "react";

import { Route, Switch, Link, useLocation } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import Home from "./pages/Home";
import PocketMarquee from "./pages/PocketMarquee";
import BookOfChanges from "./pages/BookOfChanges";
import NotFound from "./pages/NotFound";

import bear from "./assets/bear.png";

function App() {
  const location = useLocation();

  return (
    <>
      <TransitionGroup>
        <CSSTransition timeout={300} classNames="fade" key={location.key}>
          <Switch location={location}>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/pocket-marquee" exact>
              <PocketMarquee />
            </Route>
            <Route path="/book-of-changes" exact>
              <BookOfChanges />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </CSSTransition>
      </TransitionGroup>
      <Switch location={location}>
        <Route path="/" exact></Route>
        <Route path="/book-of-changes" exact>
          <Link to="/" className="bear-link inverted">
            <img className="bear-icon" src={bear} alt="a bear" />
          </Link>
        </Route>
        <Route path="*">
          <Link to="/" className="bear-link">
            <img className="bear-icon" src={bear} alt="a bear" />
          </Link>
        </Route>
      </Switch>
    </>
  );
}

export default App;
