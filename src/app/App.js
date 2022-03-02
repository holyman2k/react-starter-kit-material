import "./styles/styles.css";
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import DateAdapter from "@mui/lab/AdapterDateFns";
import { LocalizationProvider } from "@mui/lab";
import { store } from "./store";
import Layout from "./components/Layout";
import Home from "./routers/Home";
import Todo from "./routers/Todo";

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Layout>
                    <LocalizationProvider dateAdapter={DateAdapter}>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/todo" element={<Todo />} />
                        </Routes>
                    </LocalizationProvider>
                </Layout>
            </BrowserRouter>
        </Provider>
    );
}

export default App;
