import React, { useCallback, useState } from 'react';
import Loader from '../Loader/Loader';
import s from './Paginator.module.css';
import { Button } from 'antd';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';

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
          <Button
            onClick={prevPortion}
            type="primary"
            style={{ alignSelf: 'center' }}
          >
            <ArrowLeftOutlined />
          </Button>
        ) : (
          <Button
            onClick={prevPortion}
            style={{ alignSelf: 'center', background: '#515151' }}
            disabled
          >
            <ArrowLeftOutlined />
          </Button>
        )}

        {portionNumber.map((p) => (
          <Button
            key={p}
            className={props.pageSelected === p ? s.active : s.link}
            type="primary"
            // style={{
            //   display: 'flex',
            //   justifyContent: 'center',
            //   width: '100%',
            // }}
            onClick={(e) => {
              props.onPageChanged(p);
            }}
          >
            {p}
          </Button>
        ))}

        <Button
          onClick={nextPortion}
          type="primary"
          style={{ alignSelf: 'center' }}
        >
          {' '}
          <ArrowRightOutlined />
        </Button>

        {/* <button onClick={next}>{val}</button> */}
      </div>
    );
  }
};

export default Paginator;
