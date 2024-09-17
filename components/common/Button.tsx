import { div } from 'framer-motion/client';
import Link from 'next/link';
import React from 'react'

type ButtonProps = {
  text: string;
  linkString: string;
};

const Button: React.FC<ButtonProps> = ({ text, linkString }) => {
  return (
    <Link href={linkString} className="text-white bg-black py-[1rem] px-[2rem] rounded-[8px]">
      {text}
    </Link>
  );
};

export default Button;
