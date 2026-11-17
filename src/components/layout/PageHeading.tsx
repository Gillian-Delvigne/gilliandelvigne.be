const PageHeading = ({ title, dek }: { title: string; dek?: string }) => (
    <div>
        <h1 className="font-semibold text-2xl md:text-3xl leading-title tracking-title">
            {title}
        </h1>
        {dek && (
            <p className="mt-3 max-w-(--measure-dek) text-lg leading-body text-dim">
                {dek}
            </p>
        )}
    </div>
);
export default PageHeading;
