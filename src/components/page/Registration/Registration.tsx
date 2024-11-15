import { Heading, Link } from "@chakra-ui/react";
import { RegistrationCard } from "./RegistrationCard";
import { useNavigate } from "react-router-dom";

export const Registration = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Heading mb="3">新規名刺登録</Heading>
      <RegistrationCard
        skillsList={[{ id: "1", label: "React" }]}
        onSave={(data) => console.log(data)}
      />
      <Link onClick={() => navigate("/")}>ホームへ戻る</Link>
    </div>
  );
};
