import React from 'react';
import bk from '../../../assets/bk.jpg';
import joseph from '../../../assets/joseph.jpg';

import './PostInfo.scss';

const PostInfo = () => {
  return (
    <main className="post-info__container">
      <header className="post-info__header">
        <div className="post-info__author--box">
          <img
            className="post-info__author--avatar"
            src={joseph}
            alt="author-avatar"
          />
          <p className="post-info__author--name">Patrick Davies</p>
        </div>
        <p className="post-info__pub-date">14 Jul 2022</p>
      </header>

      <main className="post-info__content--main">
        <div className="post-info__post-img--holder">
          <img className="post-info__post-img" src={bk} alt="post" />
        </div>
        <h2 className="post-info__title">
          Giving New Meaning to "Mobile Home"
        </h2>
        <p className="post-info__descrp">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam
          accusamus id suscipit iusto aliquam praesentium quibusdam eum, dicta
          voluptas, repellendus aut expedita at rerum odit? Veritatis error
          similique debitis quia ex tempore sunt saepe libero, magnam, ad
          aperiam temporibus. Amet debitis delectus eveniet fugit atque
          asperiores deserunt, vitae rerum voluptates impedit expedita repellat.
          Dolorum nostrum consequuntur totam doloribus voluptates accusantium
          beatae! Necessitatibus eius deleniti dolorum magnam. Animi adipisci
          iusto eos dolorum veniam rem labore doloribus maxime provident odio!
          Amet iste atque veniam eum nesciunt, perferendis vel ex mollitia
          dolorem error est labore voluptatum id tempora, esse accusamus enim
          ratione odio. Alias est vitae deleniti molestias distinctio illo? Unde
          voluptatibus praesentium amet assumenda a delectus cum at harum,
          maxime repellendus ab molestiae natus fugiat? Dolorum nostrum
          consequuntur totam doloribus voluptates accusantium beatae!
          Necessitatibus eius deleniti dolorum magnam. Animi adipisci iusto eos
          dolorum veniam rem labore doloribus maxime provident odio! Amet iste
          atque veniam eum nesciunt, perferendis vel ex mollitia dolorem error
          est labore voluptatum id tempora, esse accusamus enim ratione odio.
          Alias est vitae deleniti molestias distinctio illo? Unde voluptatibus
          praesentium amet assumenda a delectus cum at harum, maxime repellendus
          ab molestiae natus fugiat?
        </p>
      </main>
    </main>
  );
};

export default PostInfo;
