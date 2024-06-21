import { AiFillTwitterCircle } from "react-icons/ai";
import {
  FaFacebook,
  FaInstagram,
  FaPinterest,
  FaYoutube,
} from "react-icons/fa";
import ToolTip from "./ToolTip";

const Footer = () => {
  return (
    <>
      <div className="bg-black px-[80px] py-4 text-white grid grid-cols-12 mt-24">
        <div className="col-span-3">
          <p className="text-lg font-semibold mb-2 text-[#f85606]">
            Customer Care
          </p>
          <p className="text-sm hover:cursor-pointer mb-1">Help Center</p>
          <p className="text-sm hover:cursor-pointer mb-1">how to buy</p>
          <p className="text-sm hover:cursor-pointer mb-1">Returns & Refunds</p>
          <p className="text-sm hover:cursor-pointer mb-1">Contact Us</p>
        </div>
        <div className="col-span-3">
          <p className="text-lg font-semibold text-[#f85606] mb-2">
            GrandBazzar
          </p>
          <p className="text-sm hover:cursor-pointer mb-1">About Us</p>
          <p className="text-sm hover:cursor-pointer mb-1">Careers</p>
          <p className="text-sm hover:cursor-pointer mb-1">Blogs</p>
          <p className="text-sm hover:cursor-pointer mb-1">
            Terms & Conditions
          </p>
          <p className="text-sm hover:cursor-pointer mb-1">Digital Payment</p>
        </div>
        <div className="col-span-3">
          <p className="text-lg font-semibold text-[#f85606] mb-2">
            Customer Service
          </p>
          <p className="text-sm hover:cursor-pointer mb-1">Order Status</p>
          <p className="text-sm hover:cursor-pointer mb-1">Return Policy</p>
          <p className="text-sm hover:cursor-pointer mb-1">
            FAQ, Notices & Policies
          </p>
          <p className="text-sm hover:cursor-pointer mb-1">Product Recalls</p>
        </div>
        <div className="col-span-3">
          <p className="text-lg font-semibold text-[#f85606] mb-2">
            Contact Us
          </p>
          <p className="text-sm hover:cursor-pointer mb-2">
            Call: 977-9861900236
          </p>
          <p className="text-sm hover:cursor-pointer mb-1">
            Contact Us via Email:
          </p>
          <p className="text-sm hover:cursor-pointer mb-2 ml-3">
            sohanshrestha@gmail.com
          </p>
          <p className="text-sm hover:cursor-pointer mb-1">Address:</p>
          <p className="text-sm hover:cursor-pointer mb-2 ml-3">
            Kirtipur, Kathmandu
          </p>
        </div>
        <div className="col-span-12 flex justify-between items-center gap-2 mt-5">
          <p className="text-sm">
            &copy; 2024 GrandBazar. All rights reserved.
          </p>
          <div className="flex gap-4 items-center">
            <ToolTip name="Facebook">
              <FaFacebook className="text-2xl hover:cursor-pointer" />
            </ToolTip>
            <ToolTip name="Twitter">
              <AiFillTwitterCircle className="text-2xl hover:cursor-pointer" />
            </ToolTip>
            <ToolTip name="Pinterest">
              <FaPinterest className="text-2xl hover:cursor-pointer" />
            </ToolTip>
            <ToolTip name="Youtube">
              <FaYoutube className="text-2xl hover:cursor-pointer" />
            </ToolTip>
            <ToolTip name="Instagram">
              <FaInstagram className="text-2xl hover:cursor-pointer" />
            </ToolTip>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
