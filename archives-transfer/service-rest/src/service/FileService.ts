import { FileRepository } from "../repository/FileRespository.js";
import { CreateFileDto, FileResponseDto, UpdateFileDto } from "../types/dto/File.dto.js";

export class FileService {
    private fileRepository: FileRepository;

    constructor() {
        this.fileRepository = new FileRepository();
    }

    async create(data: CreateFileDto): Promise<FileResponseDto> {
        return await this.fileRepository.create(data);   
    }

    async findById(id: number): Promise<FileResponseDto | null> {
        return await this.fileRepository.findById(id);   
    }

    async findAll(): Promise<FileResponseDto[]> {
        return await this.fileRepository.findAll();   
    }

    async update(id:number, data: UpdateFileDto): Promise<FileResponseDto | null> {

        return await this.fileRepository.update(id, data);   
    }

    async delete(id: number): Promise<FileResponseDto | null> {
        return await this.fileRepository.delete(id);
    }   
}