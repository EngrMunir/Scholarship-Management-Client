import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import './Slider.css'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

import slide1 from '../../../assets/banner1.jpg';
import slide3 from '../../../assets/banner3.jpg';
import slide4 from '../../../assets/banner4.jpg';

const Slider = () => {
    return (
        <div className='px-3 mb-5'>
        <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
    <SwiperSlide>
        <img src={slide3} alt="" />
    </SwiperSlide>
    <SwiperSlide>
        <img src={slide1} alt="" />
    </SwiperSlide>
    <SwiperSlide>
        <img src={slide4} alt="" />
    </SwiperSlide>
   
  </Swiper>
    </div>
    );
};

export default Slider;