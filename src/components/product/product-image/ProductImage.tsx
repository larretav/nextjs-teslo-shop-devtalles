import Image from 'next/image'
import React from 'react'

type Props = {
  src: string;
  alt: string;
  className: React.StyleHTMLAttributes<HTMLImageElement>['className'];
  style?: React.CSSProperties
  width: number;
  height: number;
}

export const ProductImage = ({
  src,
  alt,
  className,
  width,
  height,
  style
}: Props) => {

  const localSrc = src
    ? src.startsWith('http') ? src : `/products/${src}`
    : '/imgs/placeholder.jpg'

  return (
    <Image
      src={localSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      style={style}
    />
  )
}
