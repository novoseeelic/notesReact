import { FC } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormField } from "../FormField";
import { Button } from "../Button";
import "./NoteForm.css";
import { useMutation } from '@tanstack/react-query';
import { createNote } from '../../api/Note';
import { queryClient } from '../../api/queryClient';

export interface INoteFormProps {}

const CreateNoteSchema = z.object({
  title: z.string().min(5, "Длина поста должна быть не менее 5 символов"),
  text: z.string().min(10, "Длина поста должна быть не менее 10 символов").max(300, "Длина поста должна быть не более 300 символов"),
});

type CreateNoteForm = z.infer<typeof CreateNoteSchema>;

export const NoteForm: FC<INoteFormProps> = () => {
  const {register, handleSubmit, formState: {errors}} = useForm<CreateNoteForm>({
    resolver: zodResolver(CreateNoteSchema),
  });
  
  const createNoteMutation = useMutation(
    {
      mutationFn: (data:{
        title: string;
        text: string;
      }) => createNote(data.title, data.text),
      onSettled () {
        queryClient.invalidateQueries({queryKey: ["notes"]});
      }
    },
    queryClient
  );

  return (
    <form className="note-form" onSubmit={handleSubmit((data) => {
      createNoteMutation.mutate(data);
    })}>
      <FormField label="Заголовок" errorMessage={errors.title?.message}>
        <input type="text" {...register("title")}/>
      </FormField>
      <FormField label="Текст" errorMessage={errors.text?.message}>
        <textarea {...register("text")} />
      </FormField>
      <Button isLoading={createNoteMutation.isPending}>Сохранить</Button>
    </form>
  );
};
