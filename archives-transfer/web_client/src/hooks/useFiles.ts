// archives-transfer/web_client/src/hooks/useFiles.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../services/api";
import { FileMetadata, UploadFileResponse } from "../types/api";

export function useFiles() {
	const queryClient = useQueryClient();

	// Query para listar todos os arquivos
	const {
		data: files,
		isLoading,
		error,
	} = useQuery<FileMetadata[], Error>({
		queryKey: ["files"],
		queryFn: async () => {
			const response = await api.get<FileMetadata[]>("/");
			// const response = await api.get<FileMetadata[]>("/files");

			return response.data;
		},
	});

	// Mutação para upload de arquivo
	const uploadFileMutation = useMutation<UploadFileResponse, Error, FormData>({
		mutationFn: async (formData: FormData) => {
			const response = await api.post<UploadFileResponse>("/upload", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});
			return response.data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["files"] }); // Invalida a query de arquivos para rebuscar a lista
		},
	});

	// Mutação para deletar arquivo
	const deleteFileMutation = useMutation<void, Error, number>({
		mutationFn: async (id: number) => {
			await api.delete(`/${id}`);
			// await api.delete(`/files/${id}`);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["files"] }); // Invalida a query de arquivos para rebuscar a lista
		},
	});

	// Função para download de arquivo (retorna a URL para download)
	const getDownloadUrl = (fileId: number) => {
		return `${api.defaults.baseURL}/download/${fileId}`;
	};

	return {
		files,
		isLoading,
		error,
		uploadFile: uploadFileMutation.mutateAsync,
		isUploading: uploadFileMutation.isPending,
		uploadError: uploadFileMutation.error,
		deleteFile: deleteFileMutation.mutate,
		isDeleting: deleteFileMutation.isPending,
		deleteError: deleteFileMutation.error,
		getDownloadUrl,
	};
}
