export {
    getPosts, getPost, getPostsInCategory, getPostsByTag, getTags,
    getPostTranslation, findCatAndSlugByLocale, type Post, type TagData,
} from "./posts";
export { getCategories, getCategory, getCategoryTranslation, type Category } from "./categories";
export { getProjects, getProject, getFeaturedProjects, getProjectTranslation, findSlugInLocale, getAllProjectSlugs, getNextProject, type Project, type NextProject } from "./projects";
export { LOCALES, DEFAULT_LOCALE, isLocale, type Locale } from "./locales";
