import NextPump from "../next-pump/next-pump";

function MainHeader() {
  return (
    <div className="flex justify-center p-3">
      <div className="flex justify-center flex-col space-y-3 w-full lg:w-1/2">
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
            <span className="font-bold">LIVE</span> - Every Monday and Thursday
            at 8pm EST
          </p>
        </div>
        <div>
          <NextPump />
        </div>
      </div>
    </div>
  );
}

export default MainHeader;
