
import { UserAuthContextProvider } from "./LoginComponents/UserAuth";
import "./App.css";
import Navbar from "./Navbar";
import Main from "./Main";

const App: React.FC =() =>{
  return (
    <UserAuthContextProvider>
        <Navbar />
        <Main />
     </UserAuthContextProvider>
  );
}

export default App;
