import { FC } from 'react';
import styles from './PostTableRow.module.css';

type Props = {
  id: number;
  title: string;
  body: string;
};

export const PostTableRow: FC<Props> = ({ id, title, body }) => {
  return (
    <tr>
      <td className={styles.td}>{id}</td>
      <td className={styles.td}>{title}</td>
      <td className={styles.td}>{body}</td>
    </tr>
  );
};
