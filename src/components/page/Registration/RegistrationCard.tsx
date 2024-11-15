import {
  Button,
  Card,
  createListCollection,
  Input,
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
  Textarea,
} from "@chakra-ui/react";
import { Field } from "../../ui/field";
import { Controller, useForm } from "react-hook-form";
import { RegistrationForm } from "./Type";

type RegistrationCardProps = {
  skillsList: { id: string; label: string }[];
  onSave: (value: RegistrationForm) => void;
};

export const RegistrationCard = ({
  skillsList,
  onSave,
}: RegistrationCardProps) => {
  const {
    formState: { errors },
    control,
    register,
    handleSubmit,
  } = useForm<RegistrationForm>();
  const skills = createListCollection({
    items: skillsList.map(({ id, label }) => ({ label, value: id })),
  });

  return (
    <Card.Root w="md">
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
          <Controller
            control={control}
            name="skill_id"
            rules={{ required: "好きな技術を選択してください" }}
            render={({ field }) => (
              <SelectRoot
                name={field.name}
                value={[field.value]}
                onValueChange={({ value }) => field.onChange(value)}
                onInteractOutside={() => field.onBlur()}
                collection={skills}
                required
              >
                <SelectTrigger>
                  <SelectValueText placeholder="技術" />
                </SelectTrigger>
                <SelectContent>
                  {skills.items.map((skill) => (
                    <SelectItem item={skill} key={skill.value}>
                      {skill.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </SelectRoot>
            )}
          />
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
      <Card.Footer justifyContent="center">
        <Button
          variant="solid"
          colorPalette="teal"
          w="full"
          onClick={handleSubmit(onSave)}
        >
          新規登録
        </Button>
      </Card.Footer>
    </Card.Root>
  );
};
