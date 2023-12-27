import { useSelector } from "react-redux";

const HomePage = () => {
     const { userInfo } = useSelector((state) => state.auth);
  return (
    <div className="w-400px mx-auto mt-8">
      <h1 className="text-2xl text-center font-bold">Halaman Home</h1>
    {userInfo ? <h2 className="text-center text-lg text-blue-400 mt-8 font-semibold">Selamat datang {userInfo.username}</h2> : <h2></h2>}
    </div>
  );
};

export default HomePage;
