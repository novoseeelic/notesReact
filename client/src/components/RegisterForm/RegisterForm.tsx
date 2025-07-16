import { FC } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { registerUser } from '../../api/User';
import { queryClient } from '../../api/queryClient';

import { FormField } from "../FormField";
import { Button } from "../Button";
import "./RegisterForm.css";

const RegisterFormSchema = z.object({
  username: z.string().min(5, "Длина должна быть не менее 5 символов"),
  email: z.string().email("Введите корректный email"),
  password: z.string().min(8, "Пароль должен быть не менее 5 символов"),
});

type RegisterForm = z.infer<typeof RegisterFormSchema>;

export const RegisterForm: FC = () => {

  const {register, handleSubmit, formState: {errors}} = useForm<RegisterForm>({
    resolver: zodResolver(RegisterFormSchema),
  })

  const registerMutation = useMutation(
    {
      mutationFn: (data: {
        username: string,
        email: string,
        password: string;
      }) => registerUser(data.email, data.username, data.password),
    },
    queryClient
  );

  return (
    <form className="register-form" onSubmit={handleSubmit(({ username, email, password }) => {
      registerMutation.mutate({username, email, password})
    })}>
      <FormField label="Имя" errorMessage={errors.username?.message}>
        <input
          {...register("username")}
          type="text"          
        />
      </FormField>
      <FormField label="Email" errorMessage={errors.email?.message}>
        <input
          {...register("email")} 
        />
      </FormField>
      <FormField label="Пароль" errorMessage={errors.password?.message}>
        <input 
          {...register("password")}
          type="password"
          />
      </FormField>

      {registerMutation.error && <span>{registerMutation.error?.message}</span>}
      {console.log(registerMutation.error)}

      <Button isLoading={registerMutation.isPending}>Зарегистрироваться</Button>
    </form>
  );
};
