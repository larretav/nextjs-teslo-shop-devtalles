'use client';

import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react'
import { Swiper as SwiperObject } from 'swiper'

import 'swiper/css';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import './slideshow.css';
import { Autoplay, FreeMode, Navigation, Thumbs } from 'swiper/modules';
import Image from 'next/image';
import { ProductImage } from '../product-image/ProductImage';


type Props = {
  images: string[],
  title: string,
  className?: string
}

export const ProductSlideshow = ({ images, title, className }: Props) => {

  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperObject>();

  return (
    <div className={className}>
      <Swiper
        style={{
          '--swiper-navigation-color': '#fff',
          '--swiper-pagination-color': '#fff',
        } as React.CSSProperties}
        spaceBetween={10}
        navigation={true}
        autoplay={{ delay: 2500 }}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs, Autoplay]}
        className="mySwiper2 "
      >
        {
          images.length === 0
            ? <SwiperSlide >
              <ProductImage
                src={images?.[0]}
                alt={title}
                width={1024}
                height={800}
                className="sm:rounded-lg h-full"
              />
            </SwiperSlide>
            : images.map(img => <SwiperSlide key={img}>
              <ProductImage
                src={img}
                alt={title}
                width={1024}
                height={800}
                className="sm:rounded-lg h-full "
              />
            </SwiperSlide>)
        }
      </Swiper>

      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={0}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {
          images.map(img => <SwiperSlide key={img}>
            <ProductImage
              src={img}
              alt={title}
              width={300}
              height={300}
              style={{ width: 200, height: 200, objectFit: 'cover' }}
              className="rounded-xl "
            />
          </SwiperSlide>)
        }
      </Swiper>
    </div>
  )
}
