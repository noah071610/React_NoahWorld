import { Divider, Row } from "antd";
import React from "react";
import { languages, skills, sub_skills } from "../../../config";
import SkillBox from "./SkillBox";
import Articles from "../_common/Articles";
import Title from "../_common/Title";
import SkillImageBox from "./SkillImageBox";
import styled from "styled-components";

const SkillDescDivider = styled.span`
  font-size: 0.8rem;
`;

function SkillSection({ id }) {
  return (
    <section id={id}>
      <div className="space" />
      <Articles>
        <Title title="Main Skills" sub="우선순위를 두고 집중적으로 공부한 스킬입니다." />
        <Row style={{ paddingBottom: "1rem" }}>
          {skills.map((skill, i) => {
            return (
              <SkillBox
                key={"skill" + i}
                name={skill.name}
                src={skill.src}
                desc={skill.desc}
                level={skill.level}
              />
            );
          })}
        </Row>
        <div className="space" />
        <Divider orientation="left">
          <h4 style={{ textAlign: "start" }}>Language skills</h4>
          <SkillDescDivider>통역사국가자격증을 보유하고 있습니다.</SkillDescDivider>
        </Divider>
        <Row>
          {languages.map((lan, i) => {
            return (
              <SkillImageBox
                key={"lan" + i}
                name={lan.name}
                src={lan.src}
                licenseKor={lan.licenseKor}
                popup={lan.popup}
                content={lan.content}
              />
            );
          })}
        </Row>
        <Divider orientation="left">
          <h4 style={{ textAlign: "start" }}>Sub skills</h4>
          <SkillDescDivider>
            초록불은 주스킬과 연계해서 응용까지 공부한 스킬입니다.
          </SkillDescDivider>
        </Divider>
        <Row style={{ marginTop: "2rem" }}>
          {sub_skills.map((skill, i) => {
            return (
              <SkillImageBox
                key={"skill" + i}
                name={skill.name}
                src={skill.src}
                desc={skill.desc}
                level={skill.level}
              />
            );
          })}
        </Row>
      </Articles>
    </section>
  );
}

export default SkillSection;
