import { FC } from 'react';
import Image from 'next/image';

interface SlideData {
  imgSrc: string;
  imgAlt: string;
  iconClass: string;
  title: string;
  description: string;
}

const slides: SlideData[] = [
  {
    imgSrc: '/assets/img/carousel-1.jpg',
    imgAlt: 'carousel image 1',
    iconClass: 'ni ni-camera-compact',
    title: 'Get started with Argon',
    description: 'There’s nothing I really wanted to do in life that I wasn’t able to get good at.',
  },
  {
    imgSrc: '/assets/img/carousel-2.jpg',
    imgAlt: 'carousel image 2',
    iconClass: 'ni ni-bulb-61',
    title: 'Faster way to create web pages',
    description: 'That’s my skill. I’m not really specifically talented at anything except for the ability to learn.',
  },
  {
    imgSrc: '/assets/img/carousel-3.jpg',
    imgAlt: 'carousel image 3',
    iconClass: 'ni ni-trophy',
    title: 'Share with us your design tips!',
    description: 'Don’t be afraid to be wrong because you can’t learn anything from a compliment.',
  },
];

const SalesOverview: FC = () => {
  return (
    <div className="flex flex-wrap mt-6 -mx-3">
      <div className="w-full max-w-full px-3 mt-0 lg:w-7/12 lg:flex-none">
        <div className="border-black/12.5 dark:bg-slate-850 dark:shadow-dark-xl shadow-xl relative z-20 flex min-w-0 flex-col break-words rounded-2xl border-0 border-solid bg-white bg-clip-border">
          <div className="border-black/12.5 mb-0 rounded-t-2xl border-b-0 border-solid p-6 pt-4 pb-0">
            <h6 className="capitalize dark:text-white">Sales overview</h6>
            <p className="mb-0 text-sm leading-normal dark:text-white dark:opacity-60">
              <i className="fa fa-arrow-up text-emerald-500"></i>
              <span className="font-semibold">4% more</span> in 2021
            </p>
          </div>
          <div className="flex-auto p-4">
            <div>
              <canvas id="chart-line" height="300"></canvas>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-full px-3 lg:w-5/12 lg:flex-none">
        <div className="relative w-full h-full overflow-hidden rounded-2xl">
          {slides.map((slide, index) => (
            <div key={index} className="absolute w-full h-full transition-all duration-500">
              <Image className="object-cover h-full" src={slide.imgSrc} alt={slide.imgAlt} layout="fill" />
              <div className="block text-start ml-12 left-0 bottom-0 absolute right-[15%] pt-5 pb-5 text-white">
                <div className="inline-block w-8 h-8 mb-4 text-center text-black bg-white bg-center rounded-lg fill-current stroke-none">
                  <i className={`top-0.75 text-xxs relative text-slate-700 ${slide.iconClass}`}></i>
                </div>
                <h5 className="mb-1 text-white">{slide.title}</h5>
                <p className="dark:opacity-80">{slide.description}</p>
              </div>
            </div>
          ))}

          <button className="absolute z-10 w-10 h-10 p-2 text-lg text-white border-none opacity-50 cursor-pointer hover:opacity-100 far fa-chevron-right active:scale-110 top-6 right-4"></button>
          <button className="absolute z-10 w-10 h-10 p-2 text-lg text-white border-none opacity-50 cursor-pointer hover:opacity-100 far fa-chevron-left active:scale-110 top-6 right-16"></button>
        </div>
      </div>
    </div>
  );
};

export default SalesOverview;
