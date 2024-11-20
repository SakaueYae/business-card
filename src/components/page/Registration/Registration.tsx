import { Heading, Link, Box } from "@chakra-ui/react";
import { RegistrationCard } from "./RegistrationCard";
import { useNavigate } from "react-router-dom";
import { createUser } from "./models/createUser";
import { RegistrationForm } from "./Type";
import { useEffect, useState } from "react";
import { getSkills } from "./models/getSkills";

export const Registration = () => {
  const [error, setError] = useState(false);
  const [skills, setSkills] = useState<{ id: number; label: string }[]>([]);
  const navigate = useNavigate();
  const handleRegistration = async (data: RegistrationForm) => {
    try {
      const ok = await createUser(data);
      if (!ok) {
        setError(true);
        return;
      }
      setError(true);
      navigate("/");
    } catch {
      setError(true);
    }
  };

  useEffect(() => {
    (async () => {
      const data = await getSkills();
      if (data) setSkills(data);
    })();
  }, []);

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      backgroundColor="teal.50"
      minH="100vh"
      p="5"
    >
      <Heading mb="3" size="3xl">
        新規名刺登録
      </Heading>
      <RegistrationCard
        skillsList={skills}
        isError={error}
        onSave={handleRegistration}
      />
      <Link onClick={() => navigate("/")}>ホームへ戻る</Link>
    </Box>
  );
};
