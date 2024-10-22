"use client"
import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Gamepad2, Joystick, ZoomIn } from 'lucide-react';

const options = [
  {
    title: 'GRAPHICS',
    icon: "ZoomIn",
    description:
      '3.5" HD IPS Full-screen 640x480 display, crisp details, superior color accuracy, and wider viewing angles.',
    imageUrl: '/image/graphics.jpg', 
  },
  {
    title: 'CONTROLS',
    icon: "Joystick",
    description:
      'With dual joysticks and L/R bumpers, you can experience greater control over in-game keybindings & mechanics.',
    imageUrl: '/image/controls.jpg', 
  },
  {
    title: 'COMPUTING',
    icon: "Gamepad2",
    description:
      'The RK3326 64-bit 1.5GHz processor, Mali-G31MP2 GPU, & DDR3L RAM delivers exceptional performance.',
    imageUrl: '/image/computing.jpg', 
  },
];

const FadeImageComponent = () => {
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(0);

  const handleOptionChange = (index: number) => {
    setSelectedOptionIndex(index);
  };

  return (
    <div className="flex justify-between items-start md:items-center flex-col md:flex-row w-4/5 mx-auto bg-[#EDD2FA] py-8">
      <div className="flex flex-col gap-6 md:w-full pl-0 md:pl-12">
        {options.map((option, index) => (
          <div
            key={index}
            className={`cursor-pointer transition-colors duration-300 ${
              index === selectedOptionIndex ? 'text-black font-bold' : 'text-gray-400'
            }`}
            onClick={() => handleOptionChange(index)}
          >
                <div className='flex items-center gap-[2rem] md:w-[30rem]'>
                    { option.icon == "ZoomIn" && <ZoomIn width={150} height={150}/>}
                    { option.icon == "Joystick" && <Joystick width={150} height={150}/>}
                    { option.icon == "Gamepad2" && <Gamepad2 width={150} height={150}/>}
                    <div>
                        <h2 className="text-xl">{option.title}</h2>
                        <p className="text-base">{option.description}</p>
                    </div>
                </div>
            </div>
        ))}
      </div>

      <div className="relative w-1/2 pr-12">
        <motion.div
          key={selectedOptionIndex}
          initial={{ opacity: 0 }}  
          animate={{ opacity: 1 }}  
          exit={{ opacity: 0 }}     
          transition={{ duration: 0.5 }} 
        >
          <Image
            src={options[selectedOptionIndex].imageUrl}
            alt={options[selectedOptionIndex].title}
            className="rounded-[50%]"
            width={500}
            height={500}
            // fill={true}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default FadeImageComponent;
