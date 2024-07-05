// import { Button } from "antd";
// import { useState } from "react";
// import { RiMenuUnfold2Fill, RiMenuFoldFill } from "react-icons/ri";
// import { Link } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// const DashboardLayout = () => {
//   const [open, setOpen] = useState<boolean>(true);
//   const [isActive, setIsActive] = useState<boolean>(true);

//   const { user, logout } = useAuth();

//   const handleLogout = () => {
//     setIsActive(true);
//     console.log("clicked");
//     logout();
//   };

//   console.log({ user });
//   return (
//     <main className="flex h-screen">
//       <aside
//         className={`fixed top-0 left-0 z-20 h-full transition-transform duration-500 transform bg-[#e8fff4] ${
//           open ? "w-[300px] translate-x-0" : "w-0 -translate-x-full"
//         }`}
//       >
//         {open ? (
//           <div className="w-full h-full p-5 md:p-10 flex flex-col gap-6 justify-between">
//             {/* <div className="border border-primary p-3 rounded-xl">
//               <h1 className="text-center text-[20px] font-bold">
//                 Welcome <br></br> MR JOHN
//               </h1>
//             </div> */}
//             <div>
//               <div className="flex justify-center ">
//                 <img
//                   src="/images/green-logo.png"
//                   alt="logo"
//                   className="h-[100px]"
//                 />
//               </div>

//               <div className="flex flex-col gap-4 pt-10 items-center">
//                 <Link
//                   to="/dashboard"
//                   className={`font-bold hover:text-primary/80 ${
//                     isActive && "text-primary"
//                   }`}
//                 >
//                   Dashboard
//                 </Link>
//                 <Link
//                   to="/dashboard"
//                   className={`font-bold hover:text-primary/80 ${
//                     isActive && "text-primary"
//                   }`}
//                 >
//                   Innovations{" "}
//                   <span className="bg-red-600 rounded-xl px-3 py-[0.7px] text-[9px] text-white">
//                     34
//                   </span>
//                 </Link>
//                 <Link
//                   to="/dashboard"
//                   className={`font-bold hover:text-primary/80 ${
//                     isActive && "text-primary"
//                   }`}
//                 >
//                   Featured
//                 </Link>
//               </div>
//             </div>

//             <div className="flex justify-center">
//               <Button type="primary" onClick={handleLogout}>
//                 Logout
//               </Button>
//             </div>
//           </div>
//         ) : null}
//       </aside>
//       <div
//         className={`flex-1 transition-all duration-500 ${
//           open ? "lg:ml-[300px]" : "lg:ml-0"
//         }`}
//       >
//         <header className="w-full h-[70px] border-b flex items-center justify-between px-5">
//           <div className="flex items-center gap-6">
//             <div
//               className="p-2 border rounded-sm cursor-pointer"
//               onClick={() => setOpen(!open)}
//             >
//               {open ? <RiMenuFoldFill /> : <RiMenuUnfold2Fill />}
//             </div>
//             <div className="text-[24px] leading-[36px] font-bold">
//               Dashboard
//             </div>
//           </div>
//         </header>
//         <section className="flex-1 p-5">{/* Main content */}</section>
//       </div>
//     </main>
//   );
// };

// export default DashboardLayout;
