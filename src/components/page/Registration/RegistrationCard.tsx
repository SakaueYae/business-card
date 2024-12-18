import { Button, Card, Input, Textarea } from "@chakra-ui/react";
import { Field } from "../../ui/field";
import { useForm } from "react-hook-form";
import { RegistrationForm } from "./Type";
import { Alert } from "../../ui/alert";
import { NativeSelectField, NativeSelectRoot } from "../../ui/native-select";

type RegistrationCardProps = {
  skillsList: { id: number; label: string }[];
  isError: boolean;
  onSave: (value: RegistrationForm) => void;
};

export const RegistrationCard = ({
  skillsList,
  isError,
  onSave,
}: RegistrationCardProps) => {
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<RegistrationForm>();
  const items = skillsList.map(({ id, label }) => ({
    value: id.toString(),
    label,
  }));

  return (
    <Card.Root w={{ base: "100%", md: "md" }} boxSizing="border-box">
      <Card.Body gap="4">
        <Field
          label="ID"
          invalid={!!errors.user_id}
          errorText={errors.user_id?.message}
          required
        >
          <Input
            placeholder="ID"
            {...register("user_id", {
              required: "IDを入力してください",
            })}
          />
        </Field>
        <Field
          label="名前"
          invalid={!!errors.name}
          errorText={errors.name?.message}
          required
        >
          <Input
            placeholder="田中太郎"
            {...register("name", {
              required: "名前を入力してください",
            })}
          />
        </Field>
        <Field
          label="自己紹介"
          invalid={!!errors.description}
          errorText={errors.description?.message}
          required
        >
          <Textarea
            placeholder="<h1>HTMLタグも使用できます。</h1>"
            {...register("description", {
              required: "自己紹介を入力してください",
            })}
          />
        </Field>

        <Field
          label="好きな技術"
          invalid={!!errors.skill_id}
          errorText={errors.skill_id?.message}
          width="320px"
          required
        >
          <NativeSelectRoot w="100%">
            <NativeSelectField
              {...register("skill_id", {
                required: "好きな技術を選択してください",
              })}
              placeholder="技術"
              items={items}
            />
          </NativeSelectRoot>
        </Field>

        <Field label="GitHub ID">
          <Input placeholder="GitHub ID" {...register("github_id")} />
        </Field>
        <Field label="Qiita ID">
          <Input placeholder="Qiita ID" {...register("qiita_id")} />
        </Field>
        <Field label="X ID">
          <Input placeholder="X ID" {...register("x_id")} />
        </Field>
      </Card.Body>
      <Card.Footer justifyContent="center" flexDir="column">
        <Button
          variant="solid"
          colorPalette="teal"
          w="full"
          onClick={handleSubmit(onSave)}
        >
          新規登録
        </Button>
        {isError && (
          <Alert status="error">登録時にエラーが発生しました。</Alert>
        )}
      </Card.Footer>
    </Card.Root>
  );
};
