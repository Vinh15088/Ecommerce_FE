import React, { useState, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function ImageSlider() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const sliderRef = useRef(null);

    const slides = [
        {
        src: "../../../assets/images/Slider/chien-game-dinh-cao-ring-ngay-laptop-gaming-xin-1686818679.jpg",
        alt: "Image 1",
        info: "Chơi game đỉnh cao với Ring Ngày Laptop Gaming Xin",
        },
        {
        src: "../../../assets/images/Slider/don-tuoi-moi-san-sale-hoi-1730364247.webp",
        alt: "Image 2",
        info: "Đón tuổi mới săn sale hời",
        },
        {
        src: "../../../assets/images/Slider/ipad-pro-m4-thiet-ke-moi-hieu-nang-khung-1718008862.webp",
        alt: "Image 3",
        info: "iPad Pro M4 thiết kế mới, hiệu năng khủng",
        },
        {
        src: "../../../assets/images/Slider/laptop-van-phong-chi-4trieu-1717982800.webp",
        alt: "Image 4",
        info: "Laptop văn phòng chỉ 4 triệu",
        },
        {
        src: "../../../assets/images/Slider/lenovo-thinkpad-series-1706688953.jpg",
        alt: "Image 5",
        info: "Lenovo Thinkpad Series",
        },
        {
        src: "../../../assets/images/Slider/macbook-air-m1-gia-chi-tu-12trieu-1717983086.webp",
        alt: "Image 6",
        info: "MacBook Air M1 giá chỉ từ 12 triệu",
        },
        {
        src: "../../../assets/images/Slider/pc-1729242702.png",
        alt: "Image 7",
        info: "PC giá rẻ, chất lượng cao",
        },
    ];

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        beforeChange: (oldIndex, newIndex) => setCurrentSlide(newIndex),
        afterChange: (current) => setCurrentSlide(current),
        appendDots: (dots) => (
            <div
                style={{
                    position: "absolute",
                    bottom: "10px",
                    left: "50%",
                    transform: "translateX(-50%)",
                }}
                >
                <ul style={{display: "flex", justifyContent: "center",  gap: "1px", padding: 0, margin: 0}}>{dots}</ul>
            </div>
        ),
    };

    const handleInfoClick = (index) => {
        setCurrentSlide(index);
        sliderRef.current.slickGoTo(index);
    };

    const getVisibleInfos = () => {
        const visibleInfos = [];
        let startIndex = currentSlide;

        for (let i = 0; i < 4; i++) {
            visibleInfos.push(slides[startIndex % slides.length]);
            startIndex++;
        }

        return visibleInfos;
    };

    return (
        <div className="w-3/5 px-4 h-full">
            {/* Slider */}
            <Slider ref={sliderRef} {...settings} slickGoTo={currentSlide}>
                {slides.map((slide, index) => (
                    <div key={index} className="relative">
                        <img
                            src={slide.src}
                            alt={slide.alt}
                            className="w-full h-full rounded-lg border-2 border-gray-300"
                        />
                    </div>
                ))}
            </Slider>

            {/* Info List */}
            <div
                className="mt-2 grid grid-cols-4 gap-2"
                style={{ height: "70px" }}
            >
                {getVisibleInfos().map((slide, index) => (
                    <div
                        key={index}
                        onClick={() => handleInfoClick(slides.indexOf(slide))}
                        className={`cursor-pointer flex items-center justify-center px-4 py-2 text-center rounded-lg text-xs font-semibold border-2 border-gray-300 col-span-1 ${
                            slides.indexOf(slide) === currentSlide
                                ? "bg-blue-600 text-white"
                                : "bg-gray-200 text-gray-700"
                        }`}
                    >
                        {slide.info}
                    </div>
                ))}
            </div>
        </div>
    );
}

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
        className={`${className} slick-next`}
        style={{
            ...style,
            display: "block",
            right: "10px",
            zIndex: 1,
            color: "black",
        }}
        onClick={onClick}
        />
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
        className={`${className} slick-prev`}
        style={{
            ...style,
            display: "block",
            left: "10px",
            zIndex: 1,
            color: "black",
        }}
        onClick={onClick}
        />
    );
}

export default ImageSlider;
