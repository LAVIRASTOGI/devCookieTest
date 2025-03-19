"use client";
import React, { useEffect } from "react";
import { useUser } from "@/contexts/userContext";
import { getUserProfileHandler } from "@/lib/userAction";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

function AppWrapper({ cookie }) {
  console.log("run first");
  const { user, login } = useUser();
  const router = useRouter();

  const fetchProfile = async () => {
    try {
      const userResponse = await getUserProfileHandler(cookie?.value);
      if (userResponse?.success) {
        login(userResponse?.data);
      } else {
        if (
          window.location.pathname !== "/" &&
          window.location.pathname !== "/mock-interview"
        ) {
          router.push("/sign-in");
          toast.error(
            userResponse?.message || "User not Found. Please login again"
          );
        }
      }
    } catch (error) {
      console.log(error);
      if (
        window.location.pathname !== "/" &&
        window.location.pathname !== "/mock-interview"
      ) {
        router.push("/sign-in");
        toast.error(`User not Found.Please login again`);
      }
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
