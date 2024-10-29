import Button from "@/components/common/Button";
import HomeSVG from "@/components/SVG/HomeSVG";
import Image from "next/image";
import CountdownTimer from "@/components/mainLayout/CountdownTimer";
import Card from "@/components/mainLayout/Card";
import FadeImageComponent from "@/components/mainLayout/FadeImageComponent";
import NewsletterSignup from "@/components/mainLayout/NewsLetterSignup";

export default function Home() {
  return (
    <>
      <div className="relative h-[100vh] max-h-[1200px] overflow-hidden">
        <video
          className="absolute top-0 left-0 w-full h-full object-cover z-15"
          src="/videos/bg-video.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-10">
          <h1 className="text-white text-5xl font-bold">RETRO WORLD</h1>
          <p className="text-white text-xl mt-4">
            RELIVE THE GOLDEN ERA OF GAMING & MUSIC
          </p>
          <div className="mt-6">
            <Button text="Shop Now" linkString="/products/jacket" />
          </div>
        </div>
      </div>
      <div className="bg-[#EDD2FA] py-[6rem] flex flex-col gap-[6rem]">
        <div className="flex flex-col md:flex-row justify-between w-[90%] md:w-[70%] mx-auto">
          <div className="w-full md:w-[55%]">
            <Image
              className="rounded-[2rem] border-black border-[1px]"
              src={
                "/image/soundwave.jpg"
              }
              alt="image"
              width={1000}
              height={1000}
            />
          </div>
          <div className="flex flex-col gap-[1.5rem] items-start w-full md:w-[40%] mt-6 md:mt-0">
            <div className="bg-black h-[3.5px] rounded-[2px] w-[10rem]"></div>
            <h1 className="text-black font-bold text-[2rem]">SOUNDWAVE</h1>
            <p className="text-semiblack">
              Enjoy music with a gorgeous atmosphere and experience vintage
              charms from the 1960s, listening to your music with clarity &
              depth like it was meant to be heard. Elevate your space, amplify
              your music, and discover a new love for staying home.
            </p>
            <Button text="Shop Now" linkString="/products/jacket" />
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between w-[90%] md:w-[70%] mx-auto">
          <div className="flex flex-col gap-[1.5rem] items-start w-full md:w-[40%]">
            <div className="bg-black h-[3.5px] rounded-[2px] w-[10rem]"></div>
            <h1 className="text-black font-bold text-[2rem]">KEYBOY</h1>
            <p className="text-semiblack">
              Enjoy the nostalgia of playing up to 20,000 pre-installed classics
              across 20 vintage console emulators. Designed to be compact and
              portable, with over 10 hours of battery life, you can play all day
              anywhere and relive your favorite childhood memories.
            </p>
            <Button text="Shop Now" linkString="/products/jacket" />
          </div>
          <div className="w-full md:w-[55%] mt-6 md:mt-0">
            <Image
              className="rounded-[2rem] border-black border-[1px]"
              src={
                "/image/keyboy-1.jpg"
              }
              alt="image"
              height={1000}
              width={1000}
            />
          </div>
        </div>
        <div className="flex flex-col gap-[1rem] items-center w-4/5 mx-auto">
          <div className="bg-black h-[3.5px] rounded-[2px] w-[10rem]"></div>
          <h1 className="text-black font-bold text-[2rem]">
            OUR PASSION & PLAN
          </h1>
          <p className="text-semiblack text-center">
            At Inlighte, with each new release, we aim to evoke nostalgic
            memories while providing the highest quality & most enjoyable
            experiences. Join us as we expand and redefine the retro scene for
            enthusiasts worldwide.
          </p>
        </div>
        <div className="relative w-[90%] mx-auto">
          <HomeSVG />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80%] md:w-[60%] text-center mx-auto py-[2rem] md:py-[5rem] px-[2rem] md:px-[10rem] bg-white rounded-[1rem] border-black border-[1px] font-bold text-[1rem] md:text-[1.5rem]">
            &quot;Our mission is to bring the spirit of classic eras into modern
            households, inviting you to rekindle the feeling of &apos;home&apos;,
            while ensuring that every selection from Inlighte is a cherished
            addition to your lifestyle.&quot;
          </div>
        </div>
      </div>
      <div className="bg-arcade-1 | relative flex flex-col gap-[1rem] items-center md:items-start justify-end py-[4rem] px-[2rem] md:p-[3rem] md:h-[100vh] max-h-[1200px]">
        <div className="absolute inset-0 bg-black opacity-50"></div> 
        <h1 className="relative text-white font-bold text-[1.5rem] md:text-[2rem]">50% SUMMER SALE</h1>
        <p className="relative text-white text-center md:text-[2rem]">Final hours. Don&apos;t miss it!</p>
        <CountdownTimer /> 
      </div>

      {/* HIDDEN ON MOBILE */}
      <div className="relative bg-arcade-2 hidden md:block | h-[100vh] max-h-[1200px] bg-white">
        <div className="absolute top-0 left-[60%] rounded-b-[2rem] border-black border-[1px] items-start bg-white flex flex-col gap-[1rem] p-[3rem] w-[90%] md:w-[30%]">
          <div className="bg-black h-[3.5px] rounded-[2px] w-[10rem]"></div>
          <h1 className="text-black font-bold text-[2rem]">ENJOY MUSIC ANYWHERE</h1>
          <p className="text-semiblack">
            Designed with high-fidelity audio to emphasize clarity, you can experience your music in the most beautiful ways like never before.
          </p>
          <Button text="Shop Now" linkString="/products/jacket" />
        </div>
      </div>

      {/* SHOWN ON MOBILE*/}
      <div className="bg-[#EDD2FA]">
        <div className="flex flex-col md:flex-row w-4/5 mx-auto gap-[3rem] py-[4rem]">
          <div className="flex md:hidden">
            <Card bgLink="/image/bg-arcade-2.jpg" />
          </div>
          <Card bgLink="/image/soundbox-1.jpg" />
          <Card bgLink="/image/soundbox-2.jpg"/>
        </div>
      </div>
      <div className="bg-[#EDD2FA] pb-[4rem]">
        <FadeImageComponent />
      </div>
      <div className="bg-white border-t border-black border-[1px]">
        <NewsletterSignup />
      </div>
    </>
  );
}
