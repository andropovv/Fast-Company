import React, { useEffect, useState } from "react";
import Comment from "./Comment";
import API from "../../../api";
import Loader from "../loader/Loader";
import PropTypes from "prop-types";
import AddComment from "./AddComment";

const Comments = ({ user }) => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = (isValid, data, userId) => {
    if (!isValid) return;
    API.comments.add({ ...data, pageId: userId });
    API.comments.fetchCommentsForUser(user._id).then((data) => {
      setComments([...data]);
      setIsLoading(false);
    });
  };
  useEffect(() => {
    setIsLoading(true);
    API.comments.fetchCommentsForUser(user._id).then((data) => {
      setComments([...data]);
      setIsLoading(false);
    });
  }, []);

  const handleDelete = (id) => {
    setComments(comments.filter((comment) => comment._id !== id));
    API.comments.remove(id);
  };

  return (
    <>
      <div>
        <div className="card mb-2">
          <AddComment onSubmit={handleSubmit} />
        </div>
      </div>
      {comments.length > 0 && (
        <div className="card mb-3">
          <div className="card-body">
            <h2>Comments</h2>
            <hr />
            {!isLoading ? (
              comments.map((comment) => (
                <Comment
                  key={comment._id}
                  comment={comment}
                  onDelete={handleDelete}
                />
              ))
            ) : (
              <Loader />
            )}
          </div>
        </div>
      )}
    </>
  );
};

Comments.propTypes = {
  user: PropTypes.object
};

export default Comments;
