import "./styles/styles.css";
import React, { Suspense, useState, useEffect } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DateAdapter from "@mui/lab/AdapterDateFns";
import { LocalizationProvider } from "@mui/lab";
import Overlay from "./components/Overlay";
import { store } from "./store";
import Layout from "./components/Layout";

const Lazy = ({ path }) => {
    const LazyComponent = React.lazy(() => import(`${path}`));
    return <LazyComponent />;
};

const DelayedOverlay = () => {
    const [show, setShow] = useState(false);
    useEffect(() => {
        let timer = setTimeout(() => setShow(true), 500);
        return () => clearTimeout(timer);
    }, [setShow]);

    return show ? <Overlay /> : <></>;
};

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Suspense fallback={<DelayedOverlay />}>
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
