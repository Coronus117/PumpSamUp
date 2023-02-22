import Button from "../ui/button";
import NextPump from "../next-pump/next-pump";

function MainHeader() {
  return (
    <header className="space-y-3 p-3">
      <div className="flex justify-center">
        <div className="flex items-center font-extrabold text-3xl lg:text-5xl">
          PUMP SAM UP!!!
        </div>
        {/* <div className="absolute top-4 right-4 flex items-center">
          <Button>Sign In</Button>
        </div> */}
      </div>
      <div className="flex justify-center text-lg lg:text-2xl">
        <p>
          <span className="font-bold">LIVE</span> - Every Monday and Thursday at
          8pm EST
        </p>
      </div>
      <div>
        <NextPump />
      </div>
    </header>
  );
}

export default MainHeader;
