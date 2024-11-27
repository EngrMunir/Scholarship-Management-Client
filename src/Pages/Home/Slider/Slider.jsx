import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import './Slider.css'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

import slide1 from '../../../assets/s1.jpg';
import slide2 from '../../../assets/s3.jpg';
import slide3 from '../../../assets/s4.jpg';
import slide4 from '../../../assets/s4.jpg';

const Slider = () => {
    return (
        <div className='px-3 mb-5'>
        <Swiper navigation={true} modules={[Navigation, Autoplay,]} autoplay={{delay:2000, disableOnInteraction: false}} className="mySwiper customHeight">
    <SwiperSlide>
        <img src={slide1} alt="" />
    </SwiperSlide>
    <SwiperSlide>
        <img src={slide2} alt="" />
    </SwiperSlide>
    <SwiperSlide>
        <img src={slide3} alt="" />
    </SwiperSlide>
   
    <SwiperSlide>
        <img src={slide4} alt="" />
    </SwiperSlide>
   
  </Swiper>
    </div>
    );
};

export default Slider;