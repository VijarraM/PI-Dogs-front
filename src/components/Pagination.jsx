import { useEffect, useState } from 'react';
import { GrLinkNext, GrLinkPrevious } from 'react-icons/gr';
import './Pagination.css';

export default function Pagination({ page, setPage, maxPage, breeds }) {
  const [input, setInput] = useState(1);
  console.log(breeds);
  const nextPage = () => {
    setInput(input + 1);
    setPage(page + 1);
  };

  const prevPage = () => {
    setInput(input - 1);
    setPage(page - 1);
  };

  useEffect(() => {
    setInput(1);
  }, [breeds]);

  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      setPage(parseInt(e.target.value));
      if (parseInt(e.target.value) < 1 || parseInt(e.target.value) > maxPage || isNaN(parseInt(e.target.value))) {
        setPage(1);
        setInput(1);
      } else {
        setPage(parseInt(e.target.value));
      }
    }
  };

  const onChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <div className='pagination'>
      <button disabled={page <= 1} onClick={prevPage}>
        <GrLinkPrevious />
      </button>
      <input onChange={(e) => onChange(e)} onKeyDown={(e) => onKeyDown(e)} value={input}></input>
      <p>de&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{maxPage} </p>
      <button disabled={page >= maxPage} onClick={nextPage}>
        <GrLinkNext />
      </button>
    </div>
  );
}
