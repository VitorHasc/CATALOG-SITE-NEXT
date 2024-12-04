import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const PerfilCorretor = () => {
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (router.isReady) {
      setIsReady(true); // A página está pronta para ser renderizada no lado do cliente
    }
  }, [router.isReady]);

  if (!isReady) {
    // Você pode renderizar um loading ou algum conteúdo enquanto espera o roteador estar pronto
    return <div>Loading...</div>;
  }

  // Agora você pode usar router.query sem problemas
  console.log(router.query);

  return (
    <div>
      <h1>Perfil do Corretor</h1>
      <p>Detalhes do corretor: {router.query.id}</p>
    </div>
  );
};

export default PerfilCorretor;
