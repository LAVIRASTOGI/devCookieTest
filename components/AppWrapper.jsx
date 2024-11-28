"use client";
import React, { useEffect } from "react";
import { useUser } from "@/contexts/userContext";
import { getUserProfileHandler } from "@/lib/userAction";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

function AppWrapper({ cookie }) {
  const { user, login } = useUser();
  const router = useRouter();

  const fetchProfile = async () => {
    try {
      const userResponse = await getUserProfileHandler(cookie?.value);
      if (userResponse?.success) {
        login(userResponse?.data);
      } else {
        toast.error(
          userResponse?.message || "User not Found.Please login again"
        );

        router.push("/");
      }
    } catch (error) {
      console.log(error);
      toast.error(`User not Found.Please login again`);
      router.push("/");
    }
  };
  useEffect(() => {
    if (!user && cookie && cookie?.value) {
      fetchProfile();
    }
  }, []);
  return <></>;
}

export default AppWrapper;
