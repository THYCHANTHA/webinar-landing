import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, Router as WouterRouter } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";

// The build uses a relative base ("./") so it can be hosted from a sub-path
// such as /webinar-landing/. Derive the router base from the page's location.
const ROUTER_BASE =
  import.meta.env.BASE_URL === "./"
    ? new URL(".", window.location.href).pathname.replace(/\/$/, "")
    : import.meta.env.BASE_URL.replace(/\/$/, "");

function Router() {
  return (
    <WouterRouter base={ROUTER_BASE}>
      <Switch>
        <Route path={"/"} component={Home} />
        <Route path={"/404"} component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </WouterRouter>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
