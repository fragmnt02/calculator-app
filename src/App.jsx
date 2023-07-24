import axios from "axios";

import { AuthApp } from "./AuthApp";
import { MainApp } from "./MainApp";
import { useAppContext } from "./global/hooks/AppContext";

axios.defaults.withCredentials = true


function App() {
  const { isLoggedIn } = useAppContext();
  
  return (
    <>
      {isLoggedIn ? <MainApp /> : <AuthApp />}
    </>
  );
}

export default App;
