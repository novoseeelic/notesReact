import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { login } from '../../api/User';
import { queryClient } from '../../api/queryClient';

import "./LoginForm.css";
import { FormField } from "../FormField";
import { Button } from "../Button";
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const LoginFormSchema = z.object({
  email: z.string().email("Введите корректный email"),
  password: z.string().min(8, "Пароль должен быть не менее 5 символов"),
});

type LoginForm = z.infer<typeof LoginFormSchema>

export const LoginForm: FC = () => {

  const {register, handleSubmit, formState: {errors}} = useForm<LoginForm>({
    resolver: zodResolver(LoginFormSchema),
  })

  const loginMutation = useMutation(
    {
      mutationFn: (data:{
        email: string;
        password: string 
        }) => login(data.email, data.password),
      onSuccess() {
        queryClient.invalidateQueries({queryKey: ["users","me"]});
      },
    },
    queryClient
  );

  return (
    <form className="login-form" onSubmit={handleSubmit(({email, password}) => {
      loginMutation.mutate({email, password})
    })}>
      <FormField label="Email" errorMessage={errors.email?.message}>
        <input 
          {...register("email")}
        />
      </FormField>
      <FormField label="Пароль" errorMessage={errors.password?.message}>
        <input 
          type="password" 
          {...register("password")}
        />
      </FormField>

      {loginMutation.error && <span>{loginMutation.error.message}</span>}

      <Button isLoading={loginMutation.isPending}>Войти</Button>
    </form>
  );
};

