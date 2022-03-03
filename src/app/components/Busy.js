import { useSelector } from "react-redux";
import Loading from "./Loading";

const Busy = () => {
    const { isBusy } = useSelector((store) => store.busy);
    
    return isBusy ? <Loading /> : null;
};

export default Busy;
