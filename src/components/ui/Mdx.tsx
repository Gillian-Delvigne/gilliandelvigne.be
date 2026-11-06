import * as runtime from "react/jsx-runtime";
import Diagram from "./Diagram";

const COMPONENTS = { Diagram };

export default function Mdx({ code }: { code: string }) {
    const fn = new Function(code);
    const Content = fn({ ...runtime }).default;
    return <Content components={COMPONENTS} />;
}
