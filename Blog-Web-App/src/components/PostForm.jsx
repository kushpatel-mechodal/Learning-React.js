import React, { use, useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Select, RTE } from "./index";
import service from "../appwrite/service";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.slug || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const navigate = useNavigate();
  const user = useSelector((state) => state.user.userData);

  const submit = async (data) => {
    if (post) {
      //Update post
      const file = data.image[0] ? service.uploadFile(data.image[0]) : null;

      if (file) {
        service.deleteFile(post.image);
      }

      const dbPost = await service.updatePost(post.$id, {
        ...data,
        image: file ? file.$id : undefined,

        if(dbPost) {
          navigate(`post/${dbPost.$id}`);
        },
      });
    } else {
      //Create post
        
    }
  };

  return <div>PostForm</div>;
}

export default PostForm;
