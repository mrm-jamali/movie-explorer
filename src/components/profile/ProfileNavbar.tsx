import {
  ChevronDown,
  User,
  LogOut,
} from "lucide-react";

import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

import NotificationDropdown from "./NotificationDropdown";

type Props = {
  section: string;
  setSection: (section: string) => void;
};

export default function ProfileNavbar({
  section,
  setSection,
}: Props) {

  const titles: Record<string, string> = {
    overview: "Overview",
    watchlist: "Watchlist",
    favorites: "Favorites",
    profile: "Profile",
    movie: "Movie",
    theme: "Theme",
  };


  const { user, logout } = useAuth();
  const navigate = useNavigate();


  const [open, setOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);


  const desktopMenuRef = useRef<HTMLDivElement | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);



  useEffect(() => {

    const handleClickOutside = (e: MouseEvent) => {

      const target = e.target as Node;


      if (
        desktopMenuRef.current &&
        !desktopMenuRef.current.contains(target)
      ) {
        setOpen(false);
      }


      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(target)
      ) {
        setMobileMenu(false);
      }

    };


    document.addEventListener(
      "mousedown",
      handleClickOutside
    );


    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );


  }, []);



  return (

    <div className="relative">


      {/* TOP BAR  */}

      <div
        className="
        flex
        items-center
        justify-between
        px-4
        py-4
        gap-3
        "
      >


        {/* LEFT - TITLE */}
<h2
  className="
  text-xl
  md:text-2xl
  font-bold
  text-gray-900
  ml-2
  lg:ml-14
  flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2
  "
>
  <span className="text-gray-700 font-medium">
    Welcome to Movie Explorer
  </span>

  <span className="text-purple-600 text-lg md:text-xl">
    {user?.username || "User"}
  </span>
</h2>




        {/* RIGHT SIDE */}

        <div className="flex items-center gap-3">


          {/* NOTIFICATION */}

          <NotificationDropdown />



          {/* DESKTOP PROFILE */}

          <div
            ref={desktopMenuRef}
            className="
            relative
            hidden
            lg:block
            "
          >


            <button

              onClick={() =>
                setOpen((p) => !p)
              }

              className="
              flex
              items-center
              gap-3
              px-3
              py-2
              rounded-2xl
              bg-purple-50
              hover:bg-purple-100
              transition
              "

            >


              <img

                src={
                  user?.avatar ||
                  "/default-avatar.png"
                }

                className="
                w-10
                h-10
                rounded-full
                ring-2
                ring-purple-300
                "

              />


              <ChevronDown size={16}/>


            </button>




            {/* DROPDOWN */}

            {open && (

              <div

                className="
                absolute
                right-0
                top-full
                mt-3
                w-60
                rounded-2xl
                bg-white/80
                backdrop-blur-xl
                shadow-xl
                ring-1
                ring-purple-100
                overflow-hidden
                z-50
                "

              >


                <button

                  onClick={() => {

                    setSection("profile");
                    setOpen(false);

                  }}

                  className="
                  w-full
                  flex
                  items-center
                  gap-2
                  px-4
                  py-3
                  text-sm
                  hover:bg-purple-50
                  transition
                  "

                >

                  <User size={16}/>
                  Profile

                </button>




                <button

                  onClick={() => {

                    logout();
                    navigate("/");

                  }}

                  className="
                  w-full
                  flex
                  items-center
                  gap-2
                  px-4
                  py-3
                  text-sm
                  hover:bg-red-50
                  text-red-500
                  transition
                  "

                >

                  <LogOut size={16}/>
                  Logout

                </button>


              </div>

            )}



          </div>





          {/* MOBILE BUTTON */}

          <button

            onClick={() =>
              setMobileMenu((p)=>!p)
            }

            className="
            lg:hidden
            p-2
            rounded-xl
            bg-purple-600
            text-white
            "

          >

            <User size={18}/>

          </button>




        </div>


      </div>







      {/* ================= MOBILE MENU ================= */}


      {mobileMenu && (

        <div

          ref={mobileMenuRef}

          className="
          lg:hidden
          absolute
          right-4
          top-full
          mt-3
          w-56
          rounded-2xl
          bg-white/80
          backdrop-blur-xl
          shadow-xl
          ring-1
          ring-purple-100
          overflow-hidden
          z-50
          "

        >



          <button

            onClick={() => {

              setSection("profile");
              setMobileMenu(false);

            }}

            className="
            w-full
            flex
            items-center
            gap-2
            px-4
            py-3
            text-sm
            hover:bg-purple-50
            transition
            "

          >

            <User size={16}/>
            Profile


          </button>




          <button

            onClick={() => {

              logout();
              navigate("/");

            }}

            className="
            w-full
            flex
            items-center
            gap-2
            px-4
            py-3
            text-sm
            hover:bg-red-50
            text-red-500
            transition
            "

          >

            <LogOut size={16}/>
            Logout


          </button>



        </div>

      )}



    </div>

  );

}