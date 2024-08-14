import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { Provider } from "react-redux";
import { configurStore } from "./store/srore.js";
import "./App.css";

const store = configurStore();

ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <AuthContextProvider>
            <App />
        </AuthContextProvider>
    </Provider>
);
