import { Box, Card, Heading, Link } from "@chakra-ui/react";
import { RegistrationForm } from "../Registration/Type";
import { FaGithubSquare } from "react-icons/fa";
import { SiQiita } from "react-icons/si";
import { FaXTwitter } from "react-icons/fa6";

type UserCardProps = {
  data: RegistrationForm;
};

export const UserCard = ({ data }: UserCardProps) => {
  return (
    <Card.Root w="lg">
      <Card.Header>
        <Card.Title>{data.name}</Card.Title>
      </Card.Header>
      <Card.Body gap="3">
        <div>
          <Heading mb="3">自己紹介</Heading>
          <div dangerouslySetInnerHTML={{ __html: data.description }}></div>
        </div>
        <div>
          <Heading mb="3">好きな技術</Heading>
          <Box as="ul" listStyleType="none">
            {data.skill_id.map((value) => (
              <li>{value}</li>
            ))}
          </Box>
        </div>
        <Box
          display="flex"
          gap="3"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box display="flex" gap="2" alignItems="center">
            <Link
              cursor="pointer"
              href={`https://github.com/${data.github_id}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithubSquare size={36} />
            </Link>
            <p>{data.github_id}</p>
          </Box>
          <Box display="flex" gap="2" alignItems="center">
            <Link
              cursor="pointer"
              href={`https://qiita.com/${data.qiita_id}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <SiQiita size={36} />
            </Link>
            <p>{data.qiita_id}</p>
          </Box>
          <Box display="flex" gap="2" alignItems="center">
            <Link
              cursor="pointer"
              href={`https://x.com/${data.x_id}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaXTwitter size={36} />
            </Link>
            <p>{data.x_id}</p>
          </Box>
        </Box>
      </Card.Body>
      <Card.Footer></Card.Footer>
    </Card.Root>
  );
};
