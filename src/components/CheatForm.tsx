import { useEffect } from "react";
import {
  useForm,
  FieldValues,
  Controller,
  useFieldArray,
  Control,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import Spinner from "./UI/Spinner";
import TagSelector from "./TagSelector";
import Alert, { AlertTypes } from "./UI/Alert";
import PostEditorTest from "./Experimental/PostEditorTest";
import { useData } from "../hooks/useData";
import { LuPlusCircle, LuXCircle } from "react-icons/lu";
import { useModal } from "../contexts/modalContext";
import { ModalMethods } from "../types/modal";

import "../assets/scss/cheat-form.scss";

type Props = {};

const schema = z.object({
  title: z.string().min(1),
  text: z.string().min(1),
  codes: z
    .array(z.string().min(1))
    .min(1, "At least one code snippet is required"),
  tags: z.array(z.string()).min(1, "Select at least one tag"),
});

type FormData = z.infer<typeof schema>;

function CheatForm({}: Props) {
  const { createCheatItem, updateCheatItem, loading } = useData();
  const {
    state: { item, method },
  } = useModal();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: item?.title || "",
      text: item?.text || "",
      codes: item?.codes || ["enter code here"],
      tags: item?.tags || [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: control as Control<FormData>,
    // @ts-ignore
    name: "codes",
  });

  // console.log({fields},);

  const onSubmit = async (data: FieldValues) => {
    switch (method) {
      case ModalMethods.EDIT:
        await updateCheatItem({
          id: item?.id,
          title: data.title,
          text: data.text,
          codes: data.codes,
          tags: data.tags,
        });
        break;
      case ModalMethods.CREATE:
        await createCheatItem({
          title: data.title,
          text: data.text,
          codes: data.codes,
          tags: data.tags,
        });
        reset();
        break;
      default:
        break;
    }
  };
  useEffect(() => {
    console.log("CHEAT FORM mounted");
    return () => {
      console.log("CHEAT FORM unmounted");
    };
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="four">
      <div className="input-unit">
        <label htmlFor="title">Title</label>
        <div></div>
        <input type="text" {...register("title")} />
        {errors.title && (
          <Alert type={AlertTypes.error} message={errors.title.message} />
        )}
      </div>

      <div className="input-unit">
        <label htmlFor="title">Text</label>
        <Controller
          name="text"
          control={control}
          defaultValue={""}
          render={({ field }) => (
            <PostEditorTest value={field.value} onChange={field.onChange} />
          )}
        />
        {errors.text && (
          <Alert type={AlertTypes.error} message={errors.text.message} />
        )}
      </div>
      {fields.map((field, index) => (
        <div className="input-unit" key={field.id}>
          <label htmlFor={`codes.${index}`}>Code {index + 1}</label>
          <textarea className="code" {...register(`codes.${index}` as const)} />
          {errors.codes?.[index] && (
            <Alert
              type={AlertTypes.error}
              message={errors.codes[index]?.message}
            />
          )}
          {index > 0 && (
            <span className="code-close-btn" onClick={() => remove(index)}>
              <LuXCircle />
            </span>
          )}
        </div>
      ))}

      <div className="dynamic-input-control-unit">
      Code Snippets
        <span className="action-btn" onClick={() => append("")}>
          <LuPlusCircle />
        </span>
      </div>

      <div className="input-unit">
        <Controller
          name="tags"
          control={control}
          defaultValue={[]}
          render={({ field }) => (
            <TagSelector value={field.value} onChange={field.onChange} />
          )}
        />
        {errors.tags && (
          <Alert type={AlertTypes.error} message={errors.tags.message} />
        )}
      </div>
      <div className="input-unit">
        <button disabled={loading}>{loading ? <Spinner /> : "Save"}</button>
      </div>
    </form>
  );
}

export default CheatForm;
