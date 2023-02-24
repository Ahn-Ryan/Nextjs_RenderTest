import { useCallback, useState } from 'react';
import styled, { css } from 'styled-components';
import SwiperCore, { Autoplay, FreeMode, Navigation, Thumbs } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { TImageSet } from '@libs/models/main';
SwiperCore.use([Autoplay]);

type TProps = {
  data: TImageSet | undefined;
};

type TImageBox = {
  isLoaded: boolean;
};

export default function SlideBanner({ data }: TProps) {
  // State
  const [imageSet, setImageSet] = useState<Array<number>>([]);
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  const onLoadImage = useCallback(
    (id: number) => {
      const copiedImageSet = [...imageSet];
      if (copiedImageSet.every(item => item !== id)) {
        setImageSet(copiedImageSet.concat(id));
      }
    },
    [imageSet, data],
  );

  return (
    <Wrapper>
      <Swiper
        className="swiperImage"
        modules={[FreeMode, Navigation, Thumbs]}
        thumbs={{ swiper: thumbsSwiper }}
        style={{ width: '100%', marginBottom: '20px' }}
        spaceBetween={20}
        loop={true}
        autoplay={{ delay: 4000 }}
      >
        {data &&
          data
            .sort((a, b) => {
              return a.is_main < b.is_main ? 0 : -1;
            })
            .map((slide, index) => (
              <SwiperSlide key={index}>
                <ImageBox isLoaded={imageSet.some(item => item === index)}>
                  <img
                    src={slide.url}
                    style={{ width: '100%' }}
                    alt="slide"
                    onLoad={() => onLoadImage(index)}
                  />
                </ImageBox>
              </SwiperSlide>
            ))}
      </Swiper>
      <Swiper
        className="swiperNavigation"
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4.5}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
      >
        {data &&
          data.map((slide, index) => (
            <SwiperSlide key={index}>
              <NavigationBox isLoaded={imageSet.some(item => item === index)}>
                <img
                  src={slide.url}
                  style={{ width: '100%' }}
                  alt="slide"
                  onLoad={() => onLoadImage(index)}
                />
              </NavigationBox>
            </SwiperSlide>
          ))}
      </Swiper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 20px;
  bottom: 30px;
`;

const ImageBox = styled.div<TImageBox>`
  ${({ theme }) => theme.flexSet('center', 'center', 'row')};
  width: 100%;
  height: calc(100vh - 256px);
  background-color: #606060;
  overflow-y: hidden;
  & > img {
    object-fit: cover;
  }
  ${props =>
    props.isLoaded &&
    css`
      //로딩 이펙트 생략
    `}
`;

const NavigationBox = styled.div<TImageBox>`
  ${({ theme }) => theme.flexSet('center', 'center', 'row')};
  width: 100%;
  height: 150px;
  background-color: #606060;
  overflow-y: hidden;
  cursor: pointer;
  & > img {
    object-fit: cover;
  }
  ${props =>
    props.isLoaded &&
    css`
      //로딩 이펙트 생략
    `}
`;
