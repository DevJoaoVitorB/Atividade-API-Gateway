// archives-transfer/web_client/app/page.tsx
import FileUpload from '../src/components/FileUpload';
import FileList from '../src/components/FileList';

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Gerenciador de Arquivos
      </h1>
      
      <FileUpload />
      
      <div className="mt-12"></div>
      
      <FileList />
      
    </main>
  );
}
