
import { UserAuthContextProvider } from "./LoginComponents/UserAuth";
import "./App.css";
import Navbar from "./Navbar";
import Main from "./Main";

function App() {
  return (
    <UserAuthContextProvider>
        <Navbar />
        <Main />
     </UserAuthContextProvider>
  );
}

export default App;
