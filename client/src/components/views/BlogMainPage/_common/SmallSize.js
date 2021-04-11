import React from "react";

export function SmallPoster() {
  return (
    <section className="blog_class_small_poster">
      <h2>
        楽しく始まる韓国語教室
        <img
          alt="class_poster_flag"
          style={{ width: "3rem", paddingBottom: "0.7rem", marginLeft: "0.5rem" }}
          src="https://img.icons8.com/plasticine/100/000000/south-korea.png"
        />
      </h2>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <img
          alt="class_poster_girl"
          src="/images/blog/class_study.png"
          className="class_poster_girl"
        />
      </div>
      <div
        style={{
          marginTop: "1rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-end",
        }}
      >
        <img
          data-aos="fade-up"
          data-aos-anchor-placement="top-bottom"
          data-aos-delay="700"
          alt="class_intro_text"
          className="small_poster_cha"
          src="./images/blog/kankokugo.png"
        />
        <img
          data-aos-anchor-placement="top-bottom"
          data-aos-delay="500"
          alt="class_intro_cha"
          style={{ width: "30%", height: "30%" }}
          src="./images/blog/logo_cha.png"
        />
      </div>
    </section>
  );
}
