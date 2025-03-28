import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation(); // Get the current route

  // Define links with icons
  const navLinks = [
    { name: "Product Add", path: "/product-add", icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 8V16C4 17.1 4.9 18 6 18H18C19.1 18 20 17.1 20 16V8M4 8L12 3L20 8M4 8L12 13L20 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>},
    { name: "Product List", path: "/product-list", icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M3 6h18M3 12h18m-9 6h9"/></svg> },
    { name: "Product Order", path: "/product-order", icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M7.5 9h9m-9 3h9m-9 3h9M4.5 4.5h15a2 2 0 012 2v13a2 2 0 01-2 2h-15a2 2 0 01-2-2v-13a2 2 0 012-2z"/></svg> },
    { name: "Profile", path: "/profile", icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M3 9l9-7 9 7M4 10v10a1 1 0 001 1h14a1 1 0 001-1V10"/></svg> },
  ];

  return (
    <nav className="p-4 lg:w-[20%] w-full bg-gray-100 flex lg:flex-col items-center justify-center lg:gap-2 lg:static fixed bottom-0">
      {navLinks.map((link) => (
        <Link
          key={link.path}
          to={link.path}
          className={`cursor-pointer p-2 w-full text-sm flex items-center justify-center lg:justify-start gap-2 ${
            location.pathname === link.path ? "bg-black text-white rounded p-2" : ""
          }`}
        >
          {link.icon} 
          <span className="hidden lg:inline">{link.name}</span> {/* Show text only on lg */}
        </Link>
      ))}
    </nav>
  );
}
