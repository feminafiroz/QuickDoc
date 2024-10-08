import React from 'react';
import { Typography } from "@material-tailwind/react";
import logo from '../../../assets/images/logo.jpg';

const LINKS = [
  {
      title: "Important Links",
      items: ["Appointment", "Doctors", "Services", "About us"],
  },
  {
      title: "Contact us",
      items: ["Call: +91-8089578682", "Email: quickdoc@gmail.com", "India"],
  },
  {
      title: "Resource",
      items: ["Blog", "Newsletter", "Events", "Help center"],
  }
];

   
  const currentYear = new Date().getFullYear();

const Footer: React.FC = () => {
  return (
    <footer className="relative w-full m-2">
  <div className="mx-auto w-full max-w-7xl px-8 border-t border-blue-gray-100 pt-8">
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <div className="flex justify-center md:justify-start">
        <Typography variant="h5" className="mb-6" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
          <img src={logo} alt="QuickDoc Logo" className="h-10 inline-block" />
          <span className="text-2xl font-semibold m-3">Quick Doc</span>
        </Typography>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {LINKS.map(({ title, items }) => (
          <ul key={title}>
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-3 font-medium opacity-40" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}            >
              {title}
            </Typography>
            {items.map((link) => (
              <li key={link}>
                <Typography
                  as="a"
                  href="#"
                  color="gray"
                  className="py-1.5 font-normal transition-colors hover:text-green-500" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                >
                  {link}
                </Typography>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
    <div className="mt-12 flex flex-col items-center justify-center border-t border-blue-gray-50 py-4 md:flex-row md:justify-between">
      <Typography
            variant="small"
            className="mb-4 text-center font-normal text-blue-gray-900 md:mb-0" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}      >
        &copy; {currentYear} <a href="https://material-tailwind.com/">QuickDoc</a>. All
        Rights Reserved.
      </Typography>
      <div className="flex gap-4 text-blue-gray-900">
        <Typography as="a" href="#" className="opacity-80 transition-opacity hover:opacity-100" children={undefined} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
          {/* Add your SVG icon here */}
        </Typography>
        {/* Add more social icons here */}
      </div>
    </div>
  </div>
</footer>

  );
}

export default Footer;

