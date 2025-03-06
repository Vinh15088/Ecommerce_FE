import Laptops from "./Laptops";
import Macbooks from "./Macbooks";
import Pc from "./Pc";
import Ipads from "./Ipad";

const AllProducts = () => {
    return (
        <div className="pt-20">
            <Laptops/>
            <Macbooks/>
            <Pc />
            <Ipads />
        </div>
    );
};                                                                                              

export default AllProducts;
