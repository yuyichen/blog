// import { useState } from "react";
// import { NavLink } from "react-router-dom";

// export default () => {
//   const [open, setOpen] = useState(false);

//   return (
//     <nav className="w-full py-4 border-t border-b bg-gray-100">
//       <div className="block sm:hidden">
//         <a
//           href="#"
//           className="block md:hidden text-base font-bold uppercase text-center flex justify-center items-center"
//           onClick={() => setOpen(!open)}
//         >
//           Topics
//           <i
//             className={`${open ? "fa-chevron-down" : "fa-chevron-up"} fas ml-2`}
//           ></i>
//         </a>
//       </div>
//       <div
//         className={`w-full flex-grow sm:flex sm:items-center sm:w-auto ${
//           open ? "block" : "hidden"
//         }`}
//       >
//         <div className="w-full container mx-auto flex flex-col sm:flex-row items-center justify-center text-sm font-bold uppercase mt-0 px-6 py-2">
//           <NavLink
//             to="/"
//             className={({ isActive }) =>
//               `hover:bg-gray-400 transition rounded py-2 px-4 mx-2 ${
//                 isActive ? "bg-gray-400 text-white" : ""
//               }`
//             }
//           >
//             技术
//           </NavLink>
//           {/* <NavLink
//             to="/design"
//             className={({ isActive }) =>
//               `hover:bg-gray-400 transition rounded py-2 px-4 mx-2 ${
//                 isActive ? "bg-gray-400 text-white" : ""
//               }`
//             }
//           >
//             设计
//           </NavLink> */}
//           <NavLink
//             to="/news"
//             className={({ isActive }) =>
//               `hover:bg-gray-400 transition rounded py-2 px-4 mx-2 ${
//                 isActive ? "bg-gray-400 text-white" : ""
//               }`
//             }
//           >
//             观点
//           </NavLink>
//         </div>
//       </div>
//     </nav>
//   );
// };
import Menu from "./menu";

export default () => <Menu/>
