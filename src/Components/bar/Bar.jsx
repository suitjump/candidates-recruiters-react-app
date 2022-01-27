import React from 'react';
import style from './bar.module.scss';
import { ReactComponent as Candidate } from './Img/Candidate.svg';
import { ReactComponent as Cal } from './Img/cal.svg';
import { ReactComponent as Director } from './Img/director.svg';
import { ReactComponent as MyTasks } from './Img/mytasks.svg';
import { ReactComponent as Vacancy } from './Img/Vacancy.svg';
import { ReactComponent as Analytics } from './Img/Analitics.svg';

const Bar = () => {
  return (
    <div className={style.bar}>
      <div className={style.bar_wrap}>
        <li>
          <a href="/buildfortesters/candidates">
            <div className={style.active}></div>
            <Candidate className={style.bar_logo} />
            <div className={style.bar_category}>Кандидаты</div>
          </a>
        </li>
        <li>
          <a href="/buildfortesters/registration">
            <Analytics className={style.bar_logo} />
            <div className={style.bar_category}>Аналитика</div>
          </a>
        </li>
        <li>
          <a href="vacancies">
            <Vacancy className={style.bar_logo} />
            <div className={style.bar_category}>Вакансии</div>
          </a>
        </li>
        <li>
          <a href="recruiting_director">
            <Director className={style.bar_logo} />
            <div className={style.bar_category}>Директор по рекрутингу</div>
          </a>
        </li>
        <li>
          <a href="my_tasks">
            <MyTasks className={style.bar_logo} />
            <div className={style.bar_category}>Мои задачи</div>
          </a>
        </li>
        <li>
          <a href="calendar">
            <Cal className={style.bar_logo} />
            <div className={style.bar_category}>Календарь</div>
          </a>
        </li>
      </div>
    </div>
  );
};

export default Bar;
