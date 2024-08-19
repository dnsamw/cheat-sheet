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
import { useModal } from "../contexts/modalContext";
import { ModalMethods } from "../types/modal";
import { useDataOperations } from "../hooks/useDataOperations";

import "../assets/scss/article-form.scss";
import SubjectSelector from "./SubjectSelector";
import { subjects } from "../data";
import PostThumbPlaceholder from "./UI/PostThumbPlaceholder";

import { dummyProjects, dummyProjects as projects } from "../types/project";
import DropdownSelectionList from "./UI/DropdownSelectionList";

type Props = {};

const lightshotUrlRegex = /^https:\/\/prnt\.sc\/[a-zA-Z0-9]/;

const schema = z.object({
  title: z.string().min(1),
  body: z.string().min(1),
  thumbnailUrl: z.string().optional().refine((val) => {
    if (val === undefined || val === '') return true;
    return lightshotUrlRegex.test(val);
  }, {
    message: "Only Lightshot short URLs are allowed.",
  }),
  project: z
    .object({
      id: z.string(),
      name: z.string(),
    })
    .required(),
  tags: z
    .array(
      z.object({
        id: z.string(),
        name: z.string(),
      })
    )
    .min(1, "Select at least one tag"),
});

type FormData = z.infer<typeof schema>;

function ArticleForm({}: Props) {
  const { createCheatItem, updateCheatItem, loading } = useDataOperations();
  const {state: { item, method },dispatch } = useModal();
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
      body: item?.body || "",
      // codes: item?.codes || ["enter code here"],
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
    console.log(data);

    // switch (method) {
    //   case ModalMethods.EDIT:
    //     await updateCheatItem({
    //       id: item?.id,
    //       title: data.title,
    //       body: data.body,
    //       codes: data.codes,
    //       tags: data.tags,
    //     });
    //     break;
    //   case ModalMethods.CREATE:
    //     await createCheatItem({
    //       title: data.title,
    //       body: data.body,
    //       codes: data.codes,
    //       tags: data.tags,
    //     });
    //     reset();
    //     break;
    //   default:
    //     break;
    // }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="article-input-unit actions">
        <button type="submit" disabled={loading}>
          {loading ? <Spinner /> : "Save"}
        </button>
      </div>

      <div className="col-2-wrapper">
        <div className="left">
          <div className="article-input-unit">
            {/* <label htmlFor="title">Title</label> */}
            {/* <div></div> */}
            <input
              type="body"
              {...register("title")}
              placeholder="Enter the article title.."
            />
            {errors.title && (
              <Alert type={AlertTypes.error} message={errors.title.message} />
            )}
          </div>

          <div className="article-input-unit article99">
            <Controller
              name="body"
              control={control}
              defaultValue={""}
              render={({ field }) => (
                <PostEditorTest value={field.value} onChange={field.onChange} />
              )}
            />
            {errors.body && (
              <Alert type={AlertTypes.error} message={errors.body.message} />
            )}
          </div>
        </div>

        <div className="right">
          <div className="article-input-unit">
            {/* <p>Select Tags</p> */}
            <Controller
              name="tags"
              control={control}
              defaultValue={[]}
              render={({ field }) => (
                <SubjectSelector
                  subjects={subjects}
                  onChange={field.onChange}
                />
              )}
            />
            {errors.tags && (
              <Alert type={AlertTypes.error} message={errors.tags.message} />
            )}
          </div>

          <div className="article-input-unit">
            {/* <p>Select Project</p> */}

            <Controller
              name="project"
              control={control}
              defaultValue={{ id: "", name: "Select Project" }}
              render={({ field }) => (
                <DropdownSelectionList
                  items={dummyProjects}
                  onChange={field.onChange}
                />
              )}
            />
            {errors.project && (
              <Alert type={AlertTypes.error} message={errors.project.message} />
            )}
          </div>

          <div className="article-input-unit">
          <Controller
              name="thumbnailUrl"
              control={control}
              defaultValue={""}
              render={({ field }) => (
            <PostThumbPlaceholder onChange={field.onChange}/>
              )}
            />
            {errors.thumbnailUrl && (
              <Alert type={AlertTypes.error} message={errors.thumbnailUrl.message} />
            )}
          </div>
        </div>
      </div>
    </form>
  );
}

export default ArticleForm;
