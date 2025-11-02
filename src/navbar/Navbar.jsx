import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = ({}) => {
    const navigate = useNavigate();
    const [isOpen,setIsOpen] = useState(false);
    const buttonClasses = 'text-gray-100 font-bold text-sm px-2 py-1 hover:underline transition duration-300 cursor-pointer'
    const LogOut = () =>{
      sessionStorage.clear();
      navigate('/')
    };
    const buttons = (
      <>
        <button className={buttonClasses}>About</button>
        <button className={buttonClasses} onClick = {() => LogOut()}>LogOut</button>
      </>
    )
  return (
    <nav className="bg-zinc-950 text-white fixed w-full z-50 border-b border-gray-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex flex-row w-full justify-between">
            <div className="text-xl font-bold">
                <a href="/repos">
                  <img 
                    src="./src/assets/logo-white.png" 
                    alt="CoDeBug Logo" 
                    className="w-30 h-10"  // 👈 resize here
                  />
                </a>
            </div>
            <div className="hidden md:block">
              <div className="flex ml-10 items-baseline space-x-2">
                {buttons}
              </div>
            </div>
          </div>
          <div className="md:hidden">
            <button onClick={()=>{setIsOpen(!isOpen)}} type="button" className="fill-gray-100 ">
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 26 26">
                <path d="M 0 4 L 0 6 L 26 6 L 26 4 Z M 0 12 L 0 14 L 26 14 L 26 12 Z M 0 20 L 0 22 L 26 22 L 26 20 Z"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      {
        isOpen && (
          <div className="flex flex-col gap-y-2 md:hidden px-4 sm:px-6 pb-2">
            {buttons}
          </div>
        )
      }
    </nav>
  );
};

export default Navbar;
