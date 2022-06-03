import { UserAuthContextProvider } from "./LoginComponents/UserAuth";
import "./App.css";
import Main from "./Main";
import { HashRouter } from "react-router-dom";

const App: React.FC = () => {
  return (
    <HashRouter>
      <UserAuthContextProvider>
        <Main />
      </UserAuthContextProvider>
    </HashRouter>
  );
};

export default App;
