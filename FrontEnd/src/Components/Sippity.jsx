import { Link } from "react-router-dom";
function Sippity() {
  return (
    <>
      <div className="flex flex-row gap-1 w-60">
        <input type="text" placeholder="Search" className="border" />
      </div>
      <div>This is sippity</div>
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
export default Sippity;
