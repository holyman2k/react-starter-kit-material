import React, { useEffect } from "react";
import { setBusy } from "../slices/busySlice";
import { useDispatch } from "react-redux";

const Home = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setBusy(true));
        setTimeout(() => {
            dispatch(setBusy(false));
        }, 2000);
    }, [dispatch]);

    return (
        <div>
            <h1>Hello World</h1>
        </div>
    );
};

export default Home;
