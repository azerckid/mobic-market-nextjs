import type { NextPage } from "next";
import Button from "../../components/button";
import Layout from "../../components/layout";
import TextArea from "../../components/textarea";
import { useForm } from "react-hook-form";
import useMutation from "@libs/client/useMutation";
import { useEffect } from "react";
import { Post } from "@prisma/client";
import { useRouter } from "next/router";
import useCoords from "@libs/client/useCoords";

interface WriteForm {
  question: string;
}
interface WriteResponse {
  ok: boolean;
  post: Post;
}

const Write: NextPage = () => {
  const { latitude, longitude } = useCoords();
  const router = useRouter();
  const [post, { loading, data }] = useMutation<WriteResponse>("/api/posts");
  const { register, handleSubmit } = useForm<WriteForm>();
  const onValid = (data: WriteForm) => {
    if (loading) return;
    console.log(data);
    post({ ...data, latitude, longitude });
  };
  useEffect(() => {
    if (data?.ok) {
      console.log("ok");
      router.push(`/community/${data?.post.id}`);
    }
  }, [data, router]);

  return (
    <Layout canGoBack title="Write Post">
      <form onSubmit={handleSubmit(onValid)} className="p-4 space-y-4">
        <TextArea
          register={register("question", { required: true, minLength: 10 })}
          required
          placeholder="Ask a question!"
        />
        <Button text={loading ? "...loading" : "제출 버튼"} />
      </form>
    </Layout>
  );
};

export default Write;
