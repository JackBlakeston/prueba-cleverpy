import { useState } from 'react';
import { BODY_CHAR_LIMIT, CREATE_POST, DISCARD, EDIT_POST, EMPTY_STRING, POST_BODY, POST_TITLE, TEXT, TITLE_CHAR_LIMIT } from '../../constants';
import { useAppDispatch } from '../../redux/hooks';

import { postAdded, postEdited } from '../../slices/posts/postsSlice';
import { IPost } from '../../types';
import Button from '../Button/Button';
import styles from './PostForm.module.scss';

interface IPostFormProps {
  postToEdit?: IPost;
  isEditingPost?: boolean;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const PostForm = ({ setIsModalVisible, postToEdit, isEditingPost }: IPostFormProps) => {

  const [title, setTitle] = useState<string>(postToEdit ? postToEdit.title : EMPTY_STRING);
  const [body, setBody] = useState<string>(postToEdit ? postToEdit.body : EMPTY_STRING);

  const dispatch = useAppDispatch();

  const onTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const onBodyChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBody(event.target.value);
  };

  const handleCreatePostClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (title && body) {
      if (isEditingPost) {
        dispatch(postEdited({ id: postToEdit?.id, title, body }));
      } else {
        dispatch(postAdded({ title, body }));
      }
      setIsModalVisible(false);
    }
  };

  const handleDiscardClick = () => {
    setIsModalVisible(false);
  };

  return (
    <div className={styles.mainContainer}>
      <input
        maxLength={TITLE_CHAR_LIMIT}
        placeholder={POST_TITLE}
        type={TEXT}
        value={title}
        onChange={onTitleChange}
        className={styles.titleInput}
      />
      <span className={styles.charCountText}>{title.length} / {TITLE_CHAR_LIMIT} characters</span>
      <textarea
        maxLength={BODY_CHAR_LIMIT}
        placeholder={POST_BODY}
        value={body}
        onChange={onBodyChange}
        className={styles.bodyInput}
      />
      <span className={styles.charCountText}>{body.length} / {BODY_CHAR_LIMIT} characters</span>
      <div className={styles.buttonsContainer}>
        <Button
          text={DISCARD}
          onClick={handleDiscardClick}
        />
        <Button
          text={isEditingPost ? EDIT_POST : CREATE_POST}
          onClick={handleCreatePostClick}
          isDisabled={title === EMPTY_STRING || body === EMPTY_STRING }
        />
      </div>
    </div>
  );
};

export default PostForm;