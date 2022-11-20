import React, { useEffect, useState } from "react";
import API from "../../../api";
import PropTypes from "prop-types";
import { displayDate } from "../../../utils/displayDate";

const Comment = ({ comment, onDelete }) => {
  const [commentator, setCommentator] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    API.users
      .getById(comment.userId)
      .then((data) => {
        setCommentator(data);
      })
      .finally(() => setIsLoading(false));
  }, []);
  return (
    <>
      {!isLoading && Object.keys(commentator).length && (
        <div className="bg-light card-body mb-3">
          <div className="row">
            <div className="col">
              <div className="d-flex flex-start">
                <img
                  src={`https://avatars.dicebear.com/api/avataaars/${(
                    Math.random() + 1
                  )
                    .toString(36)
                    .substring(7)}.svg`}
                  className="
                          rounded-circle
                          shadow-1-strong
                          me-3
                      "
                  alt="avatar"
                  width="65"
                  height="65"
                />
                <div
                  className="
                          flex-grow-1 flex-shrink-1
                      "
                >
                  <div className="mb-4">
                    <div
                      className="
                                  d-flex
                                  justify-content-between
                                  align-items-center
                              "
                    >
                      <p className="mb-1">
                        {commentator.name}
                        {" - "}
                        <span className="small">
                          {displayDate(comment.created_at)}
                        </span>
                      </p>
                      <button
                        onClick={() => onDelete(comment._id)}
                        className="
                                      btn btn-sm
                                      text-primary
                                      d-flex
                                      align-items-center
                                  "
                      >
                        <i
                          className="
                                          bi bi-x-lg
                                      "
                        ></i>
                      </button>
                    </div>
                    <p className="small mb-0">{comment.content}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

Comment.propTypes = { comment: PropTypes.object, onDelete: PropTypes.func };

export default Comment;
