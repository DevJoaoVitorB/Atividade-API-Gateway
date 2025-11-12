import { z } from "zod";

const CreateFileSchema = z.object({
    name: z.string().min(2, "O nome do arquivo deve conter pelo menos 2 caracteres"),
    size: z.number().int(),
    owner: z.string().min(2, "O dono do arquivo deve conter pelo menos 2 caracteres"),
});

type CreateFileDto = z.infer<typeof CreateFileSchema>;

const UpdateFileSchema= z.object({
    name: z.string().min(2, "O nome do arquivo deve conter pelo menos 2 caracteres").optional(),
    size: z.number().int(),
    owner: z.string().min(2, "O dono do arquivo deve conter pelo menos 2 caracteres").optional(),
});

type UpdateFileDto = z.infer<typeof UpdateFileSchema>;


const FileResponseSchema= z.object({
    id: z.number(),
    name: z.string(),
    size: z.number().int(),
    owner: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
});

type FileResponseDto = z.infer<typeof FileResponseSchema>;

export {
    CreateFileSchema,
    CreateFileDto,
    UpdateFileSchema,
    UpdateFileDto,
    FileResponseSchema,
    FileResponseDto
};
