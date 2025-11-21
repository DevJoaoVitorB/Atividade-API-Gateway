// archives-transfer/web_client/src/components/FileList.tsx
"use client"; // Mark as a Client Component

import { useFiles } from "../hooks/useFiles";
import { FileMetadata } from "../types/api";

export default function FileList() {
	const { files, isLoading, error, deleteFile, getDownloadUrl, isDeleting } =
		useFiles();

	const handleDelete = (id: number) => {
		if (window.confirm("Tem certeza que deseja excluir este arquivo?")) {
			deleteFile(id);
		}
	};

	if (isLoading) {
		return (
			<section className="p-6 border rounded-lg shadow-sm text-center">
				<p>Carregando arquivos...</p>
			</section>
		);
	}

	if (error) {
		return (
			<section className="p-6 border rounded-lg shadow-sm text-center text-red-500">
				<p>Erro ao carregar arquivos: {error.message}</p>
			</section>
		);
	}

	if (!files || files.length === 0) {
		return (
			<section className="p-6 border rounded-lg shadow-sm text-center">
				<p>Nenhum arquivo encontrado.</p>
			</section>
		);
	}

	return (
		<section className="p-6 border rounded-lg shadow-sm">
			<h2 className="text-xl font-semibold mb-4">Arquivos Existentes</h2>
			<div className="overflow-x-auto">
				<table className="min-w-full bg-white">
					<thead className="bg-gray-50">
						<tr>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								ID
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Nome do Arquivo
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Tamanho
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Data de Criação
							</th>
							<th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
								Ações
							</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-gray-200">
						{files.map((file: FileMetadata) => (
							<tr key={file.id}>
								<td className="px-6 py-4 whitespace-nowrap">{file.id}</td>
								<td className="px-6 py-4 whitespace-nowrap">{file.name}</td>
								<td className="px-6 py-4 whitespace-nowrap">
									{file.size} KB
								</td>
								<td className="px-6 py-4 whitespace-nowrap">
									{new Date(file.createdAt).toLocaleDateString()}
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
									<a
										href={getDownloadUrl(file.id)}
										className="text-indigo-600 hover:text-indigo-900 mr-4"
										download
									>
										Download
									</a>
									<button
										onClick={() => handleDelete(file.id)}
										className="text-red-600 hover:text-red-900 disabled:opacity-50"
										disabled={isDeleting}
									>
										Excluir
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</section>
	);
}

// Comentei os dados mockados como solicitado
/*
const mockFiles = [
  { id: '1', fileName: 'documento_importante.pdf', size: '2.5 MB', owner: 'Alice', createdAt: '2025-11-20' },
  { id: '2', fileName: 'relatorio_mensal.docx', size: '500 KB', owner: 'Beto', createdAt: '2025-11-19' },
  { id: '3', fileName: 'apresentacao.pptx', size: '10.1 MB', owner: 'Carla', createdAt: '2025-11-18' },
];
*/