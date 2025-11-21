// archives-transfer/web_client/src/components/FileUpload.tsx
"use client";

import { useState, FormEvent } from "react";
import { useFiles } from "../hooks/useFiles";

export default function FileUpload() {
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [owner, setOwner] = useState<string>("");
	const { uploadFile, isUploading, uploadError } = useFiles();

	const handleSubmit = async (event: FormEvent) => {
		event.preventDefault();

		if (!selectedFile) {
			alert("Por favor, selecione um arquivo para upload.");
			return;
		}
		if (!owner.trim()) {
			alert("Por favor, insira o nome do proprietário.");
			return;
		}

		const formData = new FormData();
		formData.append("file", selectedFile);
		formData.append("owner", owner);

		try {
			await uploadFile(formData);
			alert("Arquivo enviado com sucesso!");
			setSelectedFile(null);
			setOwner("");
		} catch (error) {
			console.error("Erro detalhado no upload:", error);
			alert("Erro ao enviar arquivo. Verifique o console para mais detalhes.");
		}
	};

	return (
		<section className="mb-8 p-6 border rounded-lg shadow-sm">
			<h2 className="text-xl font-semibold mb-4">Upload de Arquivo</h2>
			<form onSubmit={handleSubmit}>
				<div className="mb-4">
					<label htmlFor="owner" className="block text-sm font-medium mb-2">
						Proprietário
					</label>
					<input
						type="text"
						id="owner"
						name="owner"
						className="w-full p-2 border rounded-md"
						placeholder="Digite o nome do proprietário"
						value={owner}
						onChange={(e) => setOwner(e.target.value)}
						disabled={isUploading}
						required
					/>
				</div>
				<div className="mb-4">
					<label htmlFor="file" className="block text-sm font-medium mb-2">
						Arquivo
					</label>
					<input
						type="file"
						id="file"
						name="file"
						className="w-full"
						onChange={(e) =>
							setSelectedFile(e.target.files ? e.target.files[0] : null)
						}
						disabled={isUploading}
						required
					/>
				</div>
				<button
					type="submit"
					className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed"
					disabled={isUploading}
				>
					{isUploading ? "Enviando..." : "Enviar"}
				</button>
				{uploadError && (
					<p className="mt-2 text-red-500">
						Erro no upload: {uploadError.message}
					</p>
				)}
			</form>
		</section>
	);
}
