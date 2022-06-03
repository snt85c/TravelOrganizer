import GoogleLoginButton from "./LoginComponents/GoogleLoginButton";
import shell from "./img/whiteShell.png";
export default function Navbar() {
  return (
    <>
      <div className="absolute flex top-0 z-20 min-w-full px-2 md:px-20 py-2 bg-gray-800  justify-between items-center">
        <img src={shell} alt="" width="40px" height="40px" />
        <GoogleLoginButton />
      </div>
    </>
  );
}
