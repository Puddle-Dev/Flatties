import Router from "./router/Router";
import { CookieProvider } from "./services/cookies/CookieContext";

function App() {
  return (
    <div>
      <CookieProvider>
        <Router />
      </CookieProvider>
    </div>
  );
}

export default App;
