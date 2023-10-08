import React, { useCallback, useState } from 'react';
import Loader from '../Loader/Loader';
import s from './Paginator.module.css';

type Props = {
  totalUsers: number;
  pageSelected: number;
  onPageChanged: (p: number) => void;
  pageSize?: number;
};

const Paginator: React.FC<Props> = (props) => {
  // let pagesToShow = 12;

  // let pagesCount =
  //   Math.ceil(props.totalUsers / props.pageSize) > pagesToShow
  //     ? pagesToShow
  //     : Math.ceil(props.totalUsers / props.pageSize);

  let pagesFor = useCallback((leftBorder = 1, pagesCount = 10) => {
    let pages: number[] = [];
    for (leftBorder; leftBorder <= pagesCount; leftBorder++) {
      pages.push(leftBorder);
    }
    return pages;
  }, []);
  let [portionNumber, setportionNumber] = useState(pagesFor);
  // function pagesFor(leftBorder = 1, pagesCount = 10) {
  //   pages = [];
  //   for (leftBorder; leftBorder <= pagesCount; leftBorder++) {
  //     pages.push(leftBorder);
  //   }
  //   return pages;
  // }

  let nextPortion = () => {
    setportionNumber((portionNumber) => {
      return portionNumber.map((item) => item + 10);
    });
  };
  let prevPortion = () => {
    setportionNumber((portionNumber) => {
      return portionNumber.map((item) => item - 10);
    });
  };

  if (!props.totalUsers) {
    return <Loader />;
  } else {
    return (
      <div className={s.countPages}>
        {portionNumber[0] !== 1 ? (
          <button onClick={prevPortion}> &lt; </button>
        ) : (
          <button onClick={prevPortion} disabled>
            &lt;
          </button>
        )}

        {portionNumber.map((p) => (
          <div
            key={p}
            className={props.pageSelected === p ? s.active : s.link}
            onClick={(e) => {
              props.onPageChanged(p);
            }}
          >
            {p}
          </div>
        ))}

        <button onClick={nextPortion}> &gt; </button>

        {/* <button onClick={next}>{val}</button> */}
      </div>
    );
  }
};

export default Paginator;
