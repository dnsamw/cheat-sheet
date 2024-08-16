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
  import Alert, { AlertTypes } from "./UI/Alert";
  import PostEditorTest from "./Experimental/PostEditorTest";
  import { LuPlusCircle, LuXCircle } from "react-icons/lu";
  import { useModal } from "../contexts/modalContext";
  import { ModalMethods } from "../types/modal";
  import { useDataOperations } from "../hooks/useDataOperations";
  
  import "../assets/scss/article-form.scss";
  
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
  
  function ArticleForm({}: Props) {
    const { createCheatItem, updateCheatItem, loading } = useDataOperations();
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
  
    return (
      <form onSubmit={handleSubmit(onSubmit)}>

        <div className="article-input-unit">
          <label htmlFor="title">Title</label>
          <div></div>
          <input type="text" {...register("title")} />
          {errors.title && (
            <Alert type={AlertTypes.error} message={errors.title.message} />
          )}
        </div>

        <div className="col-2-wrapper">
            <div className="left">
                <div className="article-input-unit">
                    <input type="text" />
                    <input type="text" />
                    <input type="text" />
                </div>
            </div>
            <div className="right">
                <div className="article-input-unit article99">
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
            </div>
        </div>

        <div className="article-input-unit">
          <button disabled={loading}>{loading ? <Spinner /> : "Save"}</button>
        </div>
      </form>
    );
  }
  
  export default ArticleForm;
  