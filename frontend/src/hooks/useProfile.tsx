import { useState, useEffect } from "react";
import { axiosInstance } from "../util/apiCall";
import { checkAuth } from "../util/auth";
import { User } from "../types/types";

interface GetUserResponse {
  data: {
    user: User;
  };
}

export const useProfile = (friendId?: string) => {
  const { id } = checkAuth();
  const [user, setUser] = useState<User | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res: GetUserResponse = await axiosInstance(
          `/api/users/${friendId || id}`,
          "GET",
          {}
        );
        setUser(res.data.user);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchData();
  }, [friendId, id]);

  return { user, friend: user, isLoading };
};
