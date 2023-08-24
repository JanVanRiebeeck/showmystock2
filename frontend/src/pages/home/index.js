import { useSelector } from "react-redux";
import Header from "../../components/header";
import LeftHome from "../../components/home/left";
import MiddleHome from "../../components/home/middle";
import RightHome from "../../components/home/right";

import "./style.css";

export default function Home() {
  const { user } = useSelector((user) => ({ ...user }));
  return (
    <div>
      <Header />
      <div>
        <LeftHome user={user} />
        <MiddleHome />
        <RightHome user={user} />
      </div>
    </div>
  );
}
