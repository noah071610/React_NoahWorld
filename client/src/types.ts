export interface Portfolio_SectionId {
  id: string;
}

export interface Portfolio_SkillBox {
  name: string;
  src: string;
  level?: boolean;
  desc?: string;
  popup?: boolean;
  licenseKor?: string;
  content?: React.ReactNode;
}
