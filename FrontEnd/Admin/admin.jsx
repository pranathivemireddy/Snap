import Sidebar from "./Sidebar";
function Admin(){
    return(
        <>
        <div className="flex">
        <Sidebar/>
        <div className="admin w-full h-lvh">
            <h1 className="text-xl font-bold text-center">Welcome Admin</h1>
            <div className="admin-content flex justify-center items-center h-full">
            </div>
            </div>
        </div>
        </>
    )
}
export default Admin;