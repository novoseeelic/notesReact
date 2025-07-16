import { useMutation } from "@tanstack/react-query";
import { Button } from "../Button";
import "./LogoutButton.css";
import { logoutUser } from '../../api/User';
import { queryClient } from "../../api/queryClient";
import { FC, MouseEventHandler } from "react";

export const LogoutButton: FC = () => {
  const logoutMutation = useMutation(
    {
      mutationFn: () => logoutUser(),
      onSuccess() {
        queryClient.invalidateQueries({ queryKey: ["users", "me"] });
      }
    },
    queryClient
  );

  const handleSubmit: MouseEventHandler = (event) => {
    event.preventDefault();
    logoutMutation.mutate();
  }

  return (
    <div className="logout-button">
      <Button 
        kind="secondary"
        onClick={handleSubmit} 
        isLoading={logoutMutation.isPending}>Выйти</Button>
    </div>
  );
};
