import { Link } from "react-router-dom";
function BurgerVault() {
  return (
    <>
      <div className="flex flex-row gap-1">
        <input type="text" placeholder="Search" className="border" />
        <div className="border bg-green-500">Veg</div>
        <div className="border bg-red-500">Non Veg</div>
      </div>
      <div>This is Burgervault</div>
      <div className="flex fixed bottom-0 gap-20 items-stretch">
        <button>
          <Link to="/">Home</Link>
        </button>
        <button>
          <Link to="/stalls">Back</Link>
        </button>
        <button>Continue</button>
      </div>
    </>
  );
}
export default BurgerVault;
