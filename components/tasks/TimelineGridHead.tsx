export default function TimelineGridHead({ dateRange }: { dateRange: Date[] }) {
  return (
    <>
      {dateRange.map((date, index) => (
        <div
          key={index}
          className="text-center text-xs font-medium text-(--text-secondary) p-2 border-b border-foreground z-10"
          style={{ gridRow: 1, gridColumn: index + 1 }}
        >
          <div className="text-(--text-primary)">
            {date.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}
          </div>
          <div className="text-(--text-secondary)">
            {date.toLocaleDateString("en-US", { weekday: "narrow" })}
          </div>
        </div>
      ))}
    </>
  );
}
