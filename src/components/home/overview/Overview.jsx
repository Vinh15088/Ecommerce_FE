import SideMenu from "./SideMenu";
import ImageSlider from "./ImageSlider";
import RightImages from "./RightImages";

const Overview = () => {
    return (
        <div className={`grid grid-cols-10 gap-4 pt-5 2xl:mb-24`} style={{ height: '384px' }}>
            <div className="col-start-2 col-span-8 flex flex-row mb-20">

                <SideMenu />
                <ImageSlider />
                <RightImages />
            </div>
        </div>
    );
};

export default Overview;
