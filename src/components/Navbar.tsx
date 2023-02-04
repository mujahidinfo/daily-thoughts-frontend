import { useRouter } from "next/router";
import { useState } from "react";
import Link from "next/link";
import { IconHome, IconCirclePlus, IconUserCircle } from "@tabler/icons-react";
const Navbar = () => {
  const router = useRouter();
  // active class for the active button based on the route
  const [active, setActive] = useState(router.pathname);

  //   buttons for the navbar
  const buttons = [
    {
      name: "Home",
      path: "/",
      icon: <IconHome />,
    },
    {
      name: "Add",
      path: "/create",
      icon: <IconCirclePlus size="2em" />,
    },
    {
      name: "Profile",
      path: "/profile",
      icon: <IconUserCircle />,
    },
  ];

  return (
    <>
      <div className="btm-nav">
        {buttons?.map((button) => (
          <Link href={button.path} key={button.name}>
            <button>{button.icon}</button>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Navbar;
