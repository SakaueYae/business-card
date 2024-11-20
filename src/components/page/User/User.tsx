import { Box } from "@chakra-ui/react";
import { UserCard } from "./UserCard";

export const User = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      backgroundColor="teal.50"
      minH="100vh"
    >
      <UserCard
        data={{
          user_id: "1",
          name: "名前",
          description: "<h1>自己紹介</h1>",
          skill_id: ["React"],
          github_id: "github",
          qiita_id: "qiita",
          x_id: "x",
        }}
      />
    </Box>
  );
};
