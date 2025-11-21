import prisma from "../config/prisma.js";
import { CreateFileDto, FileResponseDto, UpdateFileDto } from "../types/dto/File.dto.js";

export class FileRepository {

    async create(data: CreateFileDto): Promise<FileResponseDto> {
        return await prisma.file.create({data});
    }

    async findAll(): Promise<FileResponseDto[]> {
        return await prisma.file.findMany();
    }

    async findById(id: number): Promise<FileResponseDto | null> {
        return await prisma.file.findUnique({ where: { id: id }});
    }

    async delete(id: number): Promise<FileResponseDto | null> {
        return await prisma.file.delete({ where: { id: id } });
    } 

    async update(id: number, data: UpdateFileDto): Promise<FileResponseDto | null> {
        return await prisma.file.update({ where: { id: id }, data});
    }
}