import { Link, Outlet } from "react-router-dom"

export const NavBar = () => {
    return (
        <>
            <div className="flex flex-col items-center gap-3">
                <div className="m-10">
                    <Link 
                        to="/home"
                        className="mx-6 w-fit h-12 rounded-sm bg-indigo-100 p-2"
                    >
                        Home    
                    </Link> 
                    <Link 
                        to="/employees"
                        className="mx-6 w-fit h-12 rounded-sm bg-indigo-100 p-2 font-serif"
                    >
                        Employees    
                    </Link> 
                    <Link 
                        to="/companies"
                        className="mx-6 w-fit h-12 rounded-sm bg-indigo-100 p-2 font-serif"
                    >
                        Companies    
                    </Link> 
                </div>
            </div>
            <div className="flex flex-row justify-center">
                <Outlet />
            </div>
        </>
    )
}