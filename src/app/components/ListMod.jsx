import React from "react";
import { useComments } from "../../hooks/useComments.jsx";

const ListModerator = ({ produtoId }) => {
  const { comments, removeComment } = useComments(produtoId);
  
  const handleDelete = (commentId) => {
    removeComment(commentId);
  }

  return (
    <div>
      {comments.length > 0 ? (
        <ul className="space-y-4">
          {comments.map((comment) => (
            <li
              key={comment.id}
              className="p-4 bg-white rounded-lg shadow-md flex flex-col"
            >
              <span className="text-gray-600">Comentário: {comment.texto}</span>
              <span className="text-gray-500 text-sm">
                Usuário: {comment.usuario.nome}
              </span>
              <button
                onClick={() => handleDelete(comment.id)}
                className="mt-2 text-sm text-red-500 hover:underline"
              >
                Remover comentário
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">Nenhum comentário encontrado.</p>
      )}
    </div>
  );
};

export default ListModerator;
