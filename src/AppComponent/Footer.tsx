import { FaGithub } from "react-icons/fa";

export default function Footer(){

    return(<>
     <div className="absolute select-none flex justify-between items-center h-5 px-5 text-[0.8rem] text-gray-400 bg-gray-800 min-w-full bottom-0 z-20">
          <div>Snt85c</div>
          <a
          href="https://github.com/snt85c">
            <FaGithub />
          </a>
        </div>
    </>)
}