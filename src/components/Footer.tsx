import {Image} from "@chakra-ui/react";

import {
  BsFacebook,
  BsTwitter,
  BsYoutube,
  BsLinkedin,
  BsGithub,
} from "react-icons/bs";
import { AiOutlineCopyrightCircle } from "react-icons/ai";

const Footer = () => {
  return (
    <div className="w-full py-10 bg-black text-white/80 px-4 mt-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-4 justify-center items-center md:justify-between">
        <div className="flex items-center gap-3">
            <Image
              ml={5}
              boxSize='40px'
              objectFit='contain'
              src='dice-clipart-md.png'
            />
          <p className="flex items-center text-sm font-titleFont gap-1">
            <AiOutlineCopyrightCircle className="mt-[1px]" />
            BigSmall Blockchain | All Rights Reserved
          </p>
        </div>

        <div className="flex gap-6">
          <BsYoutube className="w-6 h-6 text-white/50 hover:text-white duration-300 cursor-pointer" />
          <BsFacebook className="w-6 h-6 text-white/50 hover:text-white duration-300 cursor-pointer" />
          <BsGithub className="w-6 h-6 text-white/50 hover:text-white duration-300 cursor-pointer" />
          <BsLinkedin className="w-6 h-6 text-white/50 hover:text-white duration-300 cursor-pointer" />
          <BsTwitter className="w-6 h-6 text-white/50 hover:text-white duration-300 cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default Footer;