import { groq } from "next-sanity";

export const homePageQuery = groq`
  *[_type == "homePage"][0]{
    title,
    subtitle,
    availability,
    aboutTitle,
    aboutLines,
    heroImage{
      alt,
      asset->{
        _id,
        url,
        metadata{
          dimensions{
            width,
            height
          }
        }
      }
    }
  }
`;
