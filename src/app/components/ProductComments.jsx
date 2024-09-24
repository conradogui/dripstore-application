import React, { useState } from "react";
import { useComments } from "../../hooks/useComments.jsx";

const ProductComments = ({ produtoId, onAddComment  }) => {
  const { comments, fetchComments, removeComment } = useComments(produtoId);
  const [newComment, setNewComment] = useState("");

  const handleAddComment = async () => {
    if (onAddComment && newComment.trim()) {
      await onAddComment(newComment);
      await fetchComments(); 
      setNewComment(""); 
    }
  };

  const handleDelete = (id) => {
    removeComment(id);
  };

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4">Comentários</h3>

      {comments.length === 0 ? (
        <p className="text-gray-500">Nenhum comentário encontrado.</p>
      ) : (
        comments.map((comment) => (
          <div key={comment.id} className="mb-4">
            <p>
              {comment.texto} - <strong>{comment.usuario.nome}</strong>
            </p>
            <button
              onClick={() => handleDelete(comment.id)}
              className="text-red-500 hover:underline"
            >
              Remover
            </button>
          </div>
        ))
      )}

      <div className="mt-6">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Escreva um comentário..."
          className="border p-2 w-full rounded"
        />
        <button
          onClick={handleAddComment}
          className="mt-2 py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Enviar Comentário
        </button>
      </div>
    </div>
  );
};

export default ProductComments;
