import { Locale } from "@/content";
import { toTimelinePoints } from "@/lib/timeline";
import { getProjects } from "@/content";
import { TimelineView } from "./TimelineView";

export const Timeline = ({ lang }: { lang: Locale }) => {
    const projects = getProjects(lang);
    const timelinePoints = toTimelinePoints(projects);
    const today = new Date();
    return (
        <>
            <TimelineView points={timelinePoints} today={today} />
            <section>temp accessible list</section>
        </>
    );
};
