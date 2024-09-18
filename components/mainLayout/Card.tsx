import Image from 'next/image'
import React from 'react'
import Button from '@/components/common/Button'

type CardProps = {
  bgLink: string; 
}

const Card: React.FC<CardProps> = ({ bgLink }) => {
  return (
    <div className='bg-white rounded-[1rem] border-black border-[1px] flex flex-col h-full'>
      <div className="relative w-full h-[600px]">
        <Image 
          className='rounded-t-[1rem]' 
          src={bgLink} 
          alt='card' 
          // width={1000}
          // height={1000}
          fill={true}
        />
      </div>
      <div className='p-[2rem] flex flex-col gap-[1rem] items-start flex-grow'>
        <div className="bg-black h-[3.5px] rounded-[2px] w-[10rem]"></div>
        <h1 className="text-black font-bold text-[1.5rem]">ANYWHERE, ANYTIME</h1>
        <p className="text-semiblack flex-grow">From the bedroom to the beach, you can play & enjoy music anywhere, anytime, from any device with bluetooth 5.3 for wireless streaming, TF card mode for direct playback from a TF card, nature mode to aid in better sleep, & AUX mode for connecting to devices like computers.</p>
        <Button text='Shop Now' linkString='/products/jacket' />
      </div>
    </div>
  )
}

export default Card;
