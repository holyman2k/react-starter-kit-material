import "./styles/styles.css"
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { store } from "./store";
import Layout from "./components/Layout";
import Home from "./routers/Home";
import Todo from "./routers/Todo";

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Layout>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/todo" element={<Todo />} />
                    </Routes>
                </Layout>
            </BrowserRouter>
        </Provider>
    );
}

export default App;
