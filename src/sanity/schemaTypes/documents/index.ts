import { author } from "./author";
import { blog } from "./blog";
import { blogIndex } from "./blog-index";
import { faq } from "./faq";
import { footer } from "./footer";
import { homePage } from "./home-page";
import { navbar } from "./navbar";
import { page } from "./page";
import { settings } from "./settings";

export const singletons = [homePage, footer, navbar, blogIndex, settings];

export const documents = [...singletons, page, blog, author, faq];
