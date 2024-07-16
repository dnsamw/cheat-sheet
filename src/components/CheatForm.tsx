import "../assets/scss/cheat-form.scss";
import { useForm, FieldValues, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Alert, { AlertTypes } from "./UI/Alert";
import { useData } from "../hooks/useData";
import TagSelector from "./TagSelector";

type Props = {};

const schema = z.object({
  title: z.string().min(1),
  text: z.string().min(1),
  code: z.string().min(1),
  tags: z.array(z.string()).min(1, "Select at least one tag"),
});

type FormData = z.infer<typeof schema>;

function CheatForm({}: Props) {
  const { createCheatItem } = useData();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FieldValues) => {
    console.log(data);
    // await createCheatItem({
    //   title: data.title,
    //   text: data.text,
    //   codes: ["npm start", "nom run dev"],
    //   tags: [
    //     { name: "react", color: "blue" },
    //     { name: "typescript", color: "skyblue" },
    //   ],
    // });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="input-unit">
        <label htmlFor="title">Title</label>
        <input type="text" {...register("title")} />
        {errors.title && (
          <Alert type={AlertTypes.error} message={errors.title.message} />
        )}
      </div>
      <div className="input-unit">
        <label htmlFor="text">Text</label>
        <textarea {...register("text")} />
        {errors.text && (
          <Alert type={AlertTypes.error} message={errors.text.message} />
        )}
      </div>
      <div className="input-unit">
        <label htmlFor="code">Code</label>
        <textarea {...register("code")} />
        {errors.code && (
          <Alert type={AlertTypes.error} message={errors.code.message} />
        )}
      </div>
      <div className="input-unit">
      <Controller
          name="tags"
          control={control}
          defaultValue={[]}
          render={({ field }) => (
            <TagSelector
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
        {errors.tags && (
          <Alert type={AlertTypes.error} message={errors.tags.message} />
        )}
      </div>
      <div className="input-unit">
        <button>Add</button>
      </div>
    </form>
  );
}

export default CheatForm;
