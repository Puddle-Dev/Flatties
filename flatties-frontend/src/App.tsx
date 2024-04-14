import Router from "./router/Router";
import { CookieProvider } from "./components/cookieManage/CookieContext";

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
