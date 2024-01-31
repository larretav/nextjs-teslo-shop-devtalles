'use client';

import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/pagination';
import './slideshow.css';

import { Autoplay, FreeMode, Pagination } from 'swiper/modules';
import Image from 'next/image';


type Props = {
  images: string[],
  title: string,
  className?: string
}

export const ProductMobileSlideshow = ({ images, title, className }: Props) => {

  return (
    <div className={className}>
      <Swiper
        spaceBetween={10}
        pagination={true}
        autoplay={{ delay: 2500 }}
        modules={[FreeMode,Autoplay, Pagination]}
        className="mySwiper2 w-full max-h-[500px]"
      >
        {
          images.map(img => <SwiperSlide key={img}>
            <Image
              src={`/products/${img}`}
              alt={title}
              width={800}
              height={600}
              className="object-fill"
            />
          </SwiperSlide>)
        }
      </Swiper>

    </div>
  )
}
