import "./styles/styles.css";
import React, { Suspense } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DateAdapter from "@mui/lab/AdapterDateFns";
import { LocalizationProvider } from "@mui/lab";
import Loading from "./components/Loading";
import { store } from "./store";
import Layout from "./components/Layout";
// import Home from "./routers/Home";
// import Todo from "./routers/Todo";

const Home = React.lazy(() => import("./routers/Home"));
const Todo = React.lazy(() => import("./routers/Todo"));

const Lazy = ({ path }) => {
    const LazyComponent = React.lazy(() => import(`${path}`));
    return <LazyComponent />;
};

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Suspense fallback={<Loading />}>
                    <LocalizationProvider dateAdapter={DateAdapter}>
                        <Layout>
                            <Routes>
                                <Route path="/" element={<Lazy path="./routers/Home" />} />
                                <Route path="/todo" element={<Lazy path="./routers/Todo" />} />
                            </Routes>
                        </Layout>
                    </LocalizationProvider>
                </Suspense>
            </BrowserRouter>
        </Provider>
    );
}

export default App;
