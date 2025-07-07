// Banner data for the Hero component

export interface BannerSlide {
  title: string;
  background: string;
  points: string[];
}

const bannerData: BannerSlide[] = [
  {
    title: "Indian Coffee is\nGrown in Shade",
    background: "/banners/1.webp",
    points: [
      "Maintain stable soil temperature and moisture levels",
      "Protect the Coffee plants from extreme weather conditions",
      "Improves soil fertility"
    ]
  },
  
  {
    title: "Indian Coffee is\nHandpicked",
    background: "/banners/2.webp",
    points: [
      "Only the ripe coffee cherries are plucked, ensuring that each bean is of the highest quality"
    ]
  },
  {
    title: "Indian Coffee is\nSun-Dried",
    background: "/banners/3.webp",
    points: [
      "The slower, more natural drying process under the sun allows for better development of unique flavours and aromas in the coffee bean"
    ]
  },
  {
    title: "Intercropping in\nIndian Coffee Plantations",
    background: "/banners/4.webp",
    points: [
      "Reduces risk of crop failure",
      "Improves soil health naturally",
      "Controls pests and diseases",
      "Increases income and sustainability"
    ]
  }
];

export default bannerData;