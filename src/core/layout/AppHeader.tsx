import { Button, Dropdown, Image, MenuProps } from "antd";
import { FaUser } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { IoMenuSharp } from "react-icons/io5";
import { TbLogout } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Underline from "../../components/UI/underline";
import { formatVND } from "../../utils/format";
import { getImageFE } from "../../utils/getImage";
import { logout } from "../store/slice/userSlice";
import { RootState } from "../store/store";
import TitleLayout from "./components/TitleLayout";

const AppHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLogin = useSelector((state: RootState) => state.user);
  const moneyWallet = useSelector((state: RootState) => state.wallet);
  const itemsLink = [
    {
      title: "Trang chủ",
      link: "/u/home",
    },
    {
      title: "Đấu giá",
      link: "/u/auction",
    },
    {
      title: "Blog",
      link: "/u/blog",
    },
  ];
  const items: MenuProps["items"] = itemsLink.map((e) => ({
    label: <Link to={e.link}>{e.title}</Link>,
    key: e.title,
  }));
  const handleLogout = () => {
    dispatch(logout());
    navigate("/auth/login");
  };
  const itemsUser: MenuProps["items"] = [
    {
      key: "0",
      label: (
        <div>
          <p className="text-base font-medium drop-shadow-xl text-black">
            {userLogin && userLogin["fullName"]}
          </p>
          <p className="text-base drop-shadow-xl text-black">
            Tài khoản:{" "}
            <span className="text-orange-600 font-black text-lg">
              {formatVND(moneyWallet ? moneyWallet : 0)}
            </span>
          </p>
        </div>
      ),
      disabled: true,
      className: "!cursor-default",
    },
    {
      type: "divider",
    },
    {
      key: "1",
      label: (
        <Link to={"/u/profile"} className="text-base">
          Thông tin cá nhân
        </Link>
      ),
      icon: <FaUser size={15} />,
      onClick: () => navigate("/u/profile"),
    },
    {
      type: "divider",
    },
    {
      key: "2",
      label: <div className="text-base text-red-600">Đăng xuất</div>,
      icon: <TbLogout size={20} color="red" />,
      onClick: handleLogout,
    },
  ];
  return (
    <div className="relative w-full py-3 md:container md:mx-auto flex justify-between">
      <div className="flex items-center gap-10 md:w-2/3">
        <Image
          preview={false}
          className="!relative !w-10 md:!w-20 !object-cover rounded-full p-2 bg-white shadow-shadowLight"
          src={getImageFE("logo_exe.png")}
          alt="logo"
        />
        <TitleLayout
          onClick={() => navigate("/")}
          className="hidden md:block md:text-3xl cursor-pointer 
          text-white drop-shadow-xl"
        >
          <strong>Shark Auction</strong>
        </TitleLayout>
      </div>
      {/*Desktop */}
      <div className="hidden md:flex items-center justify-end md:w-full gap-10">
        {itemsLink.map((element) => (
          <TitleLayout
            key={element.title}
            onClick={() => navigate(element.link)}
            className="text-base md:text-lg cursor-pointer lg:text-2xl font-normal relative group hover:text-black"
          >
            {element.title}
            <Underline />
          </TitleLayout>
        ))}
        {userLogin ? (
          <Dropdown
            menu={{ items: itemsUser }}
            placement="bottom"
            arrow
            trigger={["click"]}
            className="cursor-pointer hover:opacity-80 hover:transition-opacity duration-300"
            overlayStyle={{ width: "250px" }}
          >
            <div className="relative flex items-center gap-4 py-2 px-5 rounded-lg">
              <div className="relative w-14 h-14">
                {/* Avatar Image */}
                <img
                  className="w-14 h-14 rounded-full object-cover"
                  src={getImageFE("default.jpg")}
                  style={{ clipPath: "circle(50% at 50% 50%)" }}
                />

                {/* Circular Icon Button on the Edge */}
                <div
                  className="absolute bottom-0 right-0 bg-white rounded-full flex items-center justify-center border border-gray-300"
                  style={{ clipPath: "circle(50%)" }}
                >
                  <IoIosArrowDown size={20} color="black" />
                </div>
              </div>
            </div>
          </Dropdown>
        ) : (
          <Button
            onClick={() => navigate("/auth/login")}
            className="px-5 shadow-lg"
          >
            <p className="md:text-xl hover:text-inherit">Đăng nhập</p>
          </Button>
        )}
      </div>
      {/*Mobile */}
      <div className="md:hidden flex items-center gap-5">
        {userLogin ? (
          <Dropdown
            menu={{ items }}
            trigger={["click"]}
            className="active:text-black"
            overlayClassName="w-[150px]"
          >
            <IoMenuSharp className="text-3xl" />
          </Dropdown>
        ) : (
          <Link to={"/auth/login"} className="hover:text-black text-xl">
            Đăng nhập
          </Link>
        )}
      </div>
    </div>
  );
};

export default AppHeader;
