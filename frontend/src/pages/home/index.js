import { useSelector } from "react-redux";
import Header from "../../components/header";
import LeftHome from "../../components/home/left";
import MiddleHome from "../../components/home/middle";
import RightHome from "../../components/home/right";

import "./style.css";
import SendVerification from "../../components/home/sendVerification";
import MiddleTest from "../../components/home/middleTest";

export default function Home() {
  const { user } = useSelector((state) => ({ ...state }));
  return (
    <div>
      <Header />

      <div>
        <LeftHome user={user} />
        {user.verified === true && <MiddleHome />}
        {user.verified === false && <SendVerification user={user} />}

        <RightHome user={user} />
      </div>
    </div>
  );
}
