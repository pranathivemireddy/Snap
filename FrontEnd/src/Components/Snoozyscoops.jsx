import { Link } from "react-router-dom";
function Snoozyscoops() {
  return (
    <>
      <div className="flex flex-row gap-1">
        <input type="text" placeholder="Search" className="border" />
      </div>
      <div>This is snoozyscoops</div>
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
export default Snoozyscoops;
