import React from "react";

export function SmallPoster() {
  return (
    <div className="blog_class_small_poster">
      <h2>
        楽しく始まる韓国語教室
        <img
          alt="class_poster_flag"
          style={{ width: "3rem", paddingBottom: "0.7rem", marginLeft: "0.5rem" }}
          src="https://img.icons8.com/plasticine/100/000000/south-korea.png"
        />
      </h2>
      <img
        data-aos="fade-right"
        alt="class_poster_girl"
        src="/images/blog/class_study.png"
        style={{ width: "100%" }}
      />
      <div style={{ marginTop: "1rem", display: "flex", justifyContent: "center" }}>
        <img
          data-aos="fade-up"
          data-aos-anchor-placement="top-bottom"
          data-aos-delay="700"
          alt="class_intro_text"
          style={{ width: "50%", height: "130px" }}
          src="./images/blog/kankokugo.png"
        />
        <img
          data-aos-anchor-placement="top-bottom"
          data-aos-delay="500"
          alt="class_intro_cha"
          style={{ width: "30%" }}
          src="./images/blog/logo_cha.png"
        />
      </div>
    </div>
  );
}
