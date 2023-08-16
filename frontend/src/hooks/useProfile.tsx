import { useState, useEffect } from "react";
import { axiosInstance } from "../util/apiCall";
import { checkAuth } from "../util/auth";

interface UserProps {
  firstName: string;
  lastName: string;
  email: string;
  password?: string | null;
}

interface GetUserResponse {
  data: {
    user: UserProps;
  };
}

export const useProfile = (
  friendId?: string
): { user: UserProps | undefined; isLoading: boolean } => {
  const { id } = checkAuth();
  const [user, setUser] = useState<UserProps | undefined>(undefined);
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
